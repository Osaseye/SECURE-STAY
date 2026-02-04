# SecureStay: AI-Powered Hospitality Fraud Detection System

## Overview
SecureStay is a modern hotel booking platform integrated with a real-time Artificial Intelligence microservice designed to detect and prevent fraudulent transactions. The system utilizes machine learning to analyze booking patterns, IP geolocation, and user behavior to generate a dynamic "Risk Score" for every reservation.

This application demonstrates a hybrid architecture combining a high-performance React frontend with a Python-based intelligence layer and a serverless Firebase backend.

## Architecture

The system follows a decoupled Client-Server-Intelligence architecture:

1.  **Client (React/Vite)**: Handles guest experiences, form validation, and admin dashboard visualization.
2.  **Intelligence Layer (Python/FastAPI)**: A dedicated microservice hosted independently that accepts transaction signals and returns a probabilistic fraud score (0.0 - 1.0).
3.  **Persistence Layer (Firebase Firestore)**: Stores user sessions, booking records, and fraud logs in a NoSQL structure.
4.  **Admin Portal**: A secured interface for hospitality managers to audit "Under Review" bookings and analyze fraud trends.

## Core Features

### Guest Module
*   **Secure Booking Engine**: Multi-step checkout process with input sanitization.
*   **Real-Time Status Tracking**: Guests can monitor their booking status using a unique Reference ID.
*   **Dynamic Room Rendering**: Checkout details adapt based on inventory selection.

### Admin Module
*   **Risk Dashboard**: Visualization of fraud attempts, blocked transactions, and revenue impact.
*   **Fraud Monitor**: Detailed breakdown of risk factors (e.g., "IP Distance mismatch", "High Value", "Rapid Attempts").
*   **Action Center**: One-click approval or rejection of flagged bookings.
*   **Settings Management**: Configurable fraud sensitivity thresholds.

## Technology Stack

*   **Frontend**: React.js, Tailwind CSS, Recharts, Framer Motion
*   **Backend**: Firebase (Firestore, Authentication, Hosting)
*   **AI Service**: Python (hosted on Render)
*   **Build Tool**: Vite

## Installation & Setup

### Prerequisites
*   Node.js (v18 or higher)
*   NPM or Yarn
*   A valid Firebase Project

### Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/secure-stay.git
    cd secure-stay
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and populate it with your Firebase credentials (reference `.env.example`).

4.  **Start the development server**
    ```bash
    npm run dev
    ```

## Deployment

### Vercel Deployment
This project is optimized for deployment on Vercel.

1.  Push the code to a Git repository.
2.  Import the project into Vercel.
3.  Add the environment variables (FIREBASE_API_KEY, etc.) in the Vercel Project Settings.
4.  The `vercel.json` file handles the SPA routing configuration automatically.

## Security Considerations

*   **Rule-Based Access**: The admin portal is protected via Client-Side Route Guards and Firebase Authentication.
*   **Data Validation**: All inputs are sanitized before transmission to the AI service.
*   **Environment Isolation**: API keys are injected at build time via environment variables.

## Future Roadmap

*   **Biometric Integration**: Adding facial recognition verification for high-value bookings.
*   **Historical Analysis**: Implementation of long-term trend analysis for seasonal fraud patterns.
*   **Payment Gateway Integration**: Live processing via Paystack/Flutterwave with webhooks.

## License
Proprietary software developed for SecureStay Inc. All rights reserved.
