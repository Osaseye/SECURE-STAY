import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
import joblib
import json
import os

# Set random seed for reproducibility
np.random.seed(42)

def generate_synthetic_data(n_samples=1000):
    """
    Step 1: Generate Synthetic Dataset
    Creates 1,000 bookings with realistic probability distribution for each feature.
    Fraud label is 1 if 3+ risk flags are triggered.
    """
    print("Generating synthetic dataset...")
    
    # Define features based on prompt
    data = {
        'country_mismatch': np.random.choice([0, 1], size=n_samples, p=[0.8, 0.2]),
        'rapid_attempts': np.random.choice([0, 1], size=n_samples, p=[0.9, 0.1]),
        'odd_hour': np.random.choice([0, 1], size=n_samples, p=[0.85, 0.15]),
        'high_value_booking': np.random.choice([0, 1], size=n_samples, p=[0.8, 0.2]),
        'device_change': np.random.choice([0, 1], size=n_samples, p=[0.95, 0.05]),
        'ip_risk': np.random.choice([0, 1], size=n_samples, p=[0.98, 0.02])
    }
    
    df = pd.DataFrame(data)
    
    # Calculate risk score (sum of flags)
    # This helps in defining our ground truth for the synthetic data
    df['risk_flags_sum'] = df.sum(axis=1)
    
    def assign_fraud_prob(score):
        # Probabilistic Logic to introduce noise:
        # 0 flags: 0.1% chance
        # 1 flag: 5% chance
        # 2 flags: 30% chance (Ambigious)
        # 3 flags: 80% chance
        # 4+ flags: 95% chance
        if score == 0: return 0.001
        elif score == 1: return 0.05
        elif score == 2: return 0.30
        elif score == 3: return 0.80
        else: return 0.95
    
    # Assign actual fraud status based on random chance
    df['fraud_prob'] = df['risk_flags_sum'].apply(assign_fraud_prob)
    df['fraud'] = (np.random.rand(n_samples) < df['fraud_prob']).astype(int)
    
    # Drop the temporary helper columns
    df = df.drop(['risk_flags_sum', 'fraud_prob'], axis=1)
    
    print(f"Dataset generated with {n_samples} samples.")
    print(f"Fraud distribution:\n{df['fraud'].value_counts()}")
    return df

def train_model(df):
    """
    Step 2: Train the Model
    Use Logistic Regression (sklearn)
    Split dataset: 70% training, 30% testing
    Evaluate performance: accuracy, precision, recall, F1-score
    Save model as fraud_model_v2.pkl using joblib
    """
    print("\nTraining model...")
    
    # Separate features (X) and target (y)
    X = df.drop('fraud', axis=1)
    y = df['fraud']
    
    # Split dataset: 70% training, 30% testing
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Initialize and train Logistic Regression
    model = LogisticRegression()
    model.fit(X_train, y_train)
    
    # Make predictions on the test set
    y_pred = model.predict(X_test)
    
    # Evaluate performance
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, zero_division=0)
    recall = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    
    print("\nModel Evaluation:")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"F1 Score: {f1:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model as fraud_model_v2.pkl using joblib
    model_filename = "fraud_model_v2.pkl"
    joblib.dump(model, model_filename)
    print(f"Model saved as {model_filename}")
    
    return model

def load_and_test_model():
    """
    Step 3: Test Model
    Load the saved model
    Make predictions on a few sample bookings
    Print probability score of fraud for each booking
    """
    print("\nTesting saved model...")
    
    # Load the saved model
    try:
        loaded_model = joblib.load("fraud_model_v2.pkl")
    except FileNotFoundError:
        print("Error: fraud_model_v2.pkl not found. Make sure validation phase ran correctly.")
        return

    # Create sample bookings manually for testing
    feature_names = ['country_mismatch', 'rapid_attempts', 'odd_hour', 'high_value_booking', 'device_change', 'ip_risk']
    
    # Sample 1: Low risk (0 flags) -> Should be Legit
    sample_legit = pd.DataFrame([[0, 0, 0, 0, 0, 0]], columns=feature_names) 
    
    # Sample 2: High risk (4 flags) -> Should be Fraud
    sample_fraud = pd.DataFrame([[1, 1, 1, 1, 0, 0]], columns=feature_names)
    
    # Sample 3: Borderline (2 flags) -> Should likely be Legit (since threshold is 3)
    sample_border = pd.DataFrame([[1, 0, 1, 0, 0, 0]], columns=feature_names)
    
    samples = [sample_legit, sample_fraud, sample_border]
    sample_names = ["Legitimate Sample (0 flags)", "Fraudulent Sample (4 flags)", "Borderline Sample (2 flags)"]
    
    print("\nPrediction Results:")
    for name, sample in zip(sample_names, samples):
        # Predict probability of class 1 (Fraud)
        prob = loaded_model.predict_proba(sample)[0][1] 
        # Predict class
        pred = loaded_model.predict(sample)[0]
        label = "FRAUD" if pred == 1 else "LEGITIMATE"
        
        print(f"{name}: Predicted {label} (Fraud Probability: {prob:.4f})")

def predict_fraud(country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk):
    """
    Step 4: Hugging Face Deployment Prep
    The .pkl file will be used in a Hugging Face Space (Gradio or FastAPI)
    
    Parameters:
    - country_mismatch (int): 0 or 1
    - rapid_attempts (int): 0 or 1
    - odd_hour (int): 0 or 1
    - high_value_booking (int): 0 or 1
    - device_change (int): 0 or 1
    - ip_risk (int): 0 or 1
    
    Returns:
    - JSON string: {"risk_score": float}
    """
    # Load model (Note: In a persistent server like FastAPI/Gradio, load this once globally, not inside the function)
    if os.path.exists("fraud_model_v2.pkl"):
        model = joblib.load("fraud_model_v2.pkl")
    else:
        return json.dumps({"error": "Model not found"})
    
    # Prepare input features (must match training feature order)
    feature_names = ['country_mismatch', 'rapid_attempts', 'odd_hour', 'high_value_booking', 'device_change', 'ip_risk']
    input_df = pd.DataFrame([[country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk]], 
                           columns=feature_names)
    
    # Get probability of fraud (class 1)
    risk_score = model.predict_proba(input_df)[0][1]
    
    # Return as JSON
    return json.dumps({"risk_score": float(risk_score)})

if __name__ == "__main__":
    # --- Execute the Full Pipeline ---
    
    # 1. Generate Data
    df_synthetic = generate_synthetic_data()
    
    # 2. Train Model
    trained_model = train_model(df_synthetic)
    
    # 3. Test Model
    load_and_test_model()
    
    # 4. Demonstate Deployment Function
    print("\n--- Deployment Function Check ---")
    test_prediction = predict_fraud(country_mismatch=1, rapid_attempts=1, odd_hour=1, high_value_booking=0, device_change=0, ip_risk=0)
    print(f"Input: 3 flags (1,1,1,0,0,0) -> API Output: {test_prediction}")
