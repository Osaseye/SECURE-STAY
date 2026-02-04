import gradio as gr
import joblib
import pandas as pd
import json

# Load the trained model
# Using a global variable to load it once
try:
    model = joblib.load("fraud_model_v2.pkl")
    print("Model loaded successfully.")
except FileNotFoundError:
    print("Error: fraud_model_v2.pkl not found. Please run fraud_detection.py first.")
    model = None

def predict_fraud(country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk):
    """
    Predicts fraud probability based on input features.
    Returns a JSON string with the risk score.
    """
    if model is None:
        return json.dumps({"error": "Model not loaded"})
    
    # Create a DataFrame with the inputs (must match training columns)
    feature_names = ['country_mismatch', 'rapid_attempts', 'odd_hour', 'high_value_booking', 'device_change', 'ip_risk']
    
    # Convert inputs to integers (True/False -> 1/0 if checkboxes are used, or strictly ensuring int)
    input_data = [
        int(country_mismatch),
        int(rapid_attempts),
        int(odd_hour),
        int(high_value_booking),
        int(device_change),
        int(ip_risk)
    ]
    
    df = pd.DataFrame([input_data], columns=feature_names)
    
    # Get probability of fraud (class 1)
    risk_score = model.predict_proba(df)[0][1]
    
    # Return as JSON
    return json.dumps({"risk_score": float(risk_score)})

def gradio_interface(country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk):
    # Wrapper to format the output for the UI nice and clean, 
    # while still using the core logic that returns JSON
    json_result = predict_fraud(country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk)
    result = json.loads(json_result)
    
    if "error" in result:
        return result["error"]
        
    score = result["risk_score"]
    percentage = score * 100
    
    # Determine label based on simple threshold (e.g. 0.5)
    # Note: In the training script, we noticed threshold might need tuning, 
    # but for display we usually say > 50% is High Risk.
    label = "FRAUDULENT" if score > 0.5 else "LEGITIMATE"
    
    return f"Prediction: {label}\nRisk Probability: {percentage:.2f}%\n\nRaw JSON: {json_result}"

# Define the Gradio Interface
with gr.Blocks() as demo:
    gr.Markdown("# Hotel Booking Fraud Detection System")
    gr.Markdown("Enter booking details to predict the likelihood of fraud.")
    
    with gr.Row():
        with gr.Column():
            country_mismatch = gr.Radio(choices=[("No", 0), ("Yes", 1)], label="Country Mismatch (Booking vs Payment)", value=0)
            rapid_attempts = gr.Radio(choices=[("No", 0), ("Yes", 1)], label="Rapid Booking Attempts", value=0)
            odd_hour = gr.Radio(choices=[("No", 0), ("Yes", 1)], label="Odd Hour (12AM - 5AM)", value=0)
        with gr.Column():
            high_value_booking = gr.Radio(choices=[("No", 0), ("Yes", 1)], label="High Value Booking", value=0)
            device_change = gr.Radio(choices=[("No", 0), ("Yes", 1)], label="Frequent Device Change", value=0)
            ip_risk = gr.Radio(choices=[("No", 0), ("Yes", 1)], label="High Risk IP Address", value=0)

    submit_btn = gr.Button("Predict Fraud Risk")
    output = gr.Textbox(label="Result")

    submit_btn.click(
        fn=gradio_interface,
        inputs=[country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk],
        outputs=output
    )

if __name__ == "__main__":
    demo.launch()
