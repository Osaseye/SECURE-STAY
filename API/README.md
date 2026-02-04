# Fraud Detection System (Student Project)

A lightweight machine learning system to predict fraudulent hotel bookings.

## 🚀 Project Overview
This system uses a **Logistic Regression** model trained on a synthetic dataset to identify risky bookings based on behaviors like rapid attempts, IP risks, and country mismatches.

- **Model Accuracy**: ~96%
- **Key Metric**: Optimized for **Recall** (catching fraud) using probabilistic risk scoring.
- **Interface**: Interactive Web UI built with **Gradio**.

## 📂 File Structure
- `fraud_detection.py`: Main script. Generates data, trains model, and saves `.pkl` file.
- `app.py`: The web application (uses Gradio).
- `fraud_model_v2.pkl`: The trained machine learning model.
- `requirements.txt`: List of dependencies.

## 🛠️ How to Run Locally

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Train the Model** (Optional - model is already saved)
   ```bash
   python fraud_detection.py
   ```

3. **Launch the Interface**
   ```bash
   python app.py
   ```
   Open your browser to the local URL provided (usually `http://127.0.0.1:7860`).

## 🧠 Model Logic (Risk Flags)
The model analyzes these 6 features:
1. **Country Mismatch**: Booking country different from payment.
2. **Rapid Attempts**: Multiple bookings in short time.
3. **Odd Hour**: Booking made between 12 AM - 5 AM.
4. **High Value**: Price significantly above average.
5. **Device Change**: User changed device quickly.
6. **IP Risk**: IP address flagged in historical data.

## ☁️ Deployment (Hugging Face)
This project is ready for Hugging Face Spaces.
1. Create a new Space (SDK: Gradio).
2. Upload `app.py`, `requirements.txt`, and `fraud_model_v2.pkl`.
3. Validated JSON output is included in the interface.
