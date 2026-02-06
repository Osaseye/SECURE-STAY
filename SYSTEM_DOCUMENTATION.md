# SecureStay System Documentation

## 1. Executive Summary (Non-Technical)
SecureStay is a fraudulent transaction detection system designed for the hospitality industry. It ensures that when a guest books a room, the transaction is analyzed in real-time by an Artificial Intelligence engine before being confirmed.

**How it works:**
1.  **Guest Selection**: Users browse hotels and select a room.
2.  **Smart Checkout**: Upon entering details, the system captures background signals (Location, Device usage, Booking value).
3.  **AI Analysis**: These signals are sent to a specialized "Brain" (The API) which calculates a risk score (0-100%).
4.  **Instant Decision**:
    *   **Low Risk**: Booking confirmed immediately.
    *   **High Risk**: Booking sent to "Under Review" for admin approval.
5.  **Admin Oversight**: Managers use a dashboard to see blocked attempts and approve risky but valid bookings.

---

## 2. Technical Architecture

The system is a **hybrid microservice architecture** consisting of two distinct parts:

### Part A: The Frontend Application (`Secure-stay/`)
**Built with:** React 18, Vite, Tailwind CSS, Firebase v9

This is the user interface that runs in the browser. It handles:
*   **Routing**: Managing navigation between Home, Booking, and Admin pages.
*   **State Management**: Passing hotel/room data from selection to checkout using React Router State.
*   **Security**: storing API credentials in `.env` files rather than source code.

**Key Directories:**
*   `src/config/`: Contains `firebase.js` which initializes the connection to the database. Keys are loaded dynamically via `import.meta.env`.
*   `src/services/`:
    *   `fraudService.js`: Communicates with the Python API.
    *   `bookingService.js`: Communicates with Firebase Firestore (Database).
*   `src/pages/guest/`: Contains the complex `GuestFormPage.jsx` which gathers data and orchestrates the transaction.

### Part B: The Intelligence Layer (`API/`)
**Built with:** Python, FastAPI, Scikit-Learn

This is a separate server (microservice) that focuses purely on mathematics and logic. It does not know about the HTML user interface.

**Key Files:**
*   `api.py`: The entry point. It opens a web server (likely on Port 8000 or Render) waiting for `POST /predict` requests.
*   `fraud_model.pkl`: A serialized Machine Learning file. This is a "saved brain" that has been trained on historical data patterns.
*   `fraud_detection.py`: Helper logic that reformats incoming JSON data into a format the model understands (Vectors).

---

## 3. Data Flow & Integration

### Booking Lifecycle
1.  **User Action**: User clicks "Pay & Confirm" on `GuestFormPage.jsx`.
2.  **Signal Capture**: React collects:
    *   Form Data (Name, Email)
    *   Context Data (IP Address, Device ID, Time of Day)
3.  **API Call (Integration Point 1)**:
    *   Frontend sends JSON to `https://fraud-detection-microservice.../predict`.
    *   Backend calculates score and returns `{ "risk_score": 0.85 }`.
4.  **Logic Gate**:
    *   If `risk_score > 0.8` -> Status = `Rejected`
    *   If `risk_score > 0.2` -> Status = `Under Review`
    *   Else -> Status = `Confirmed`
5.  **Database Write (Integration Point 2)**:
    *   React writes the final booking object (including the risk score and status) to **Firebase Firestore** collection `bookings`.
6.  **Admin Update**:
    *   `Dashboard.jsx` listens to Firestore changes in real-time and updates the charts immediately.

---

## 4. Security Audit Report

**Date of Audit:** February 6, 2026
**Scope:** Frontend Source Code (`Secure-stay/src`)

### Findings & Actions Taken:

1.  **Firebase Credentials Detected** (High Severity):
    *   *Issue*: API Keys were hardcoded in `firebase.js`.
    *   *Resolution*: Keys migrated to `.env` file. `firebase.js` updated to use `import.meta.env.VITE_FIREBASE_...`.

2.  **Admin Credentials Detected** (Medium Severity):
    *   *Issue*: Hardcoded variable `ADMIN_PASS = 'secure123'` found in `AdminLogin.jsx`.
    *   *Resolution*: Credentials migrated to `.env` (`VITE_ADMIN_PASSWORD`).

3.  **Service Endpoint Exposure** (Low Severity):
    *   *Observation*: The Python Microservice URL is visible in `fraudService.js`.
    *   *Status*: Acceptable. Client-side applications must know the endpoint to call it. The backend itself handles CORS and rate limiting.

### Recommendations for Production:
*   Ensure the `.env` file is added to `.gitignore`.
*   When deploying to Vercel, copy the contents of `.env` manually into the Project Settings -> Environment Variables.
*   Rotate the Admin Password immediately after deployment.
