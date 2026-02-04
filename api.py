from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

# Initialize FastAPI app
app = FastAPI(
    title="Hotel Fraud Detection API",
    description="Microservice to predict booking fraud risk using a Logistic Regression model.",
    version="1.0"
)

# Global variable for the model
model = None

@app.on_event("startup")
def load_model():
    """
    Load the trained model from the .pkl file on server startup.
    This ensures we don't reload the model for every request (efficiency).
    """
    global model
    model_path = "fraud_model_v2.pkl"
    
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print(f"✅ Model loaded successfully from {model_path}")
    else:
        print(f"❌ Error: Model file '{model_path}' not found!")
        # In production, you might want to raise an error or fail startup
        # But for now, we'll let it run and fail gracefully in the endpoint

# Define the input data structure using Pydantic
# This performs automatic validation (ensures fields are integers, etc.)
class BookingRisk(BaseModel):
    country_mismatch: int # 0 or 1
    rapid_attempts: int   # 0 or 1
    odd_hour: int         # 0 or 1
    high_value_booking: int # 0 or 1
    device_change: int    # 0 or 1
    ip_risk: int          # 0 or 1

@app.get("/")
def home():
    """
    Health check endpoint.
    """
    return {"message": "Fraud Detection API is running", "model_loaded": model is not None}

@app.post("/predict")
def predict_fraud(booking: BookingRisk):
    """
    Predicts the probability of fraud for a given booking.
    
    Input: JSON with 6 risk flags.
    Output: JSON with "risk_score" (0 to 1).
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded. Check server logs.")

    # 1. Prepare input data for the model
    # The feature names must match exactly what the model was trained on
    feature_names = ['country_mismatch', 'rapid_attempts', 'odd_hour', 
                     'high_value_booking', 'device_change', 'ip_risk']
    
    # Extract values from the Pydantic model
    input_data = [[
        booking.country_mismatch,
        booking.rapid_attempts,
        booking.odd_hour,
        booking.high_value_booking,
        booking.device_change,
        booking.ip_risk
    ]]
    
    # Convert to DataFrame (sklearn models usually expect this structure)
    df = pd.DataFrame(input_data, columns=feature_names)
    
    try:
        # 2. Make Prediction
        # predict_proba returns [[prob_class_0, prob_class_1]]
        # We want the probability of Class 1 (Fraud)
        probability = model.predict_proba(df)[0][1]
        
        # 3. Return Result
        return {"risk_score": float(probability)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    # This block allows running the API locally with `python api.py`
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
