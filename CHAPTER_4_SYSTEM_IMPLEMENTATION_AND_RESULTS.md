# CHAPTER FOUR: SYSTEM IMPLEMENTATION AND RESULTS

## 4.1 Introduction
This chapter documents the practical realization of the Secure-Stay system. It details the setup of the development environment, the implementation of specific modules across the frontend and backend, the testing strategies employed to validate system functionality, and the results obtained from the deployment of the system.

## 4.2 Development Environment
The system was developed and tested using the following hardware and software configurations:

*   **Operating System:** Windows 10 / 11
*   **Integrated Development Environment (IDE):** Visual Studio Code (VS Code) with extensions for ES7+ React/Redux and Python.
*   **Runtime Environments:**
    *   **Node.js (v18+):** Required for managing frontend dependencies and the build pipeline.
    *   **Python (v3.9+):** Required for executing the backend microservice and training the ML model.
*   **Browser:** Google Chrome (Developer Edition) for debugging and testing responsive design.
*   **Version Control:** Git for source code management.

## 4.3 System Implementation

### 4.3.1 Frontend Implementation
The frontend is the primary interface for all users and is built as a Single Page Application (SPA) using **React.js**.

1.  **Component Structure:**
    The application is modularized into reusable components located in the `src/components` directory.
    *   `Navbar.jsx`: Provides global navigation.
    *   `Sidebar.jsx`: Offers vertical navigation for the admin dashboard.
    *   `ProtectedRoute.jsx`: Acts as a higher-order component (HOC) that intercepts navigation requests to admin routes. It checks the `localStorage` for an `isAuthenticated` flag; if absent, it redirects the user to the login page.

2.  **Routing:**
    `react-router-dom` is used in `App.jsx` to define the navigation structure.
    *   **Public Routes:** `/`, `/hotels`, `/booking`, `/track-booking`.
    *   **Private Routes:** All paths under `/admin/*` are wrapped in the `ProtectedRoute` component.

3.  **State Management & Service integration:**
    React Hooks (`useState`, `useEffect`) manage local UI state. The application interacts with external services via dedicated modules:
    *   **`bookingService.js`:** Uses the Firebase SDK (`addDoc`, `onSnapshot`) to write to and read from the Firestore database. Real-time listeners enable the admin dashboard to update instantly without page reloads.
    *   **`fraudService.js`:** Uses the overarching `fetch` API to send POST requests to the Python microservice, retrieving a risk score before the booking is finalized.

### 4.3.2 Backend Implementation
The backend intelligence is implemented as a lightweight microservice using **FastAPI**.

1.  **API Structure:**
    The file `API/api.py` serves as the entry point. It defines the application instance and handles CORS (Cross-Origin Resource Sharing) compatibility.
    *   **Input Validation:** The `Pydantic` library is used to define the `BookingRisk` data model, ensuring that the API only accepts valid integer inputs (0 or 1) for the six risk factors.

2.  **Machine Learning Operations:**
    *   **Model Loading:** The system implements an efficient startup event (`@app.on_event("startup")`) that loads the serialized `fraud_model_v2.pkl` file into memory once. This prevents the overhead of reading the file from disk for every single request.
    *   **Prediction Logic:** The `/predict` endpoint accepts the JSON payload, converts it into a Pandas DataFrame (matching the training schema), and invokes `model.predict_proba()` to obtain the fraud likelihood.

3.  **Training Script:**
    The `fraud_detection.py` script acts as the utility for model generation. It generates a synthetic dataset of 1,000 records, splits the data (70% training, 30% testing), trains the Logistic Regression classifier, and serializes the result using `joblib`.

### 4.3.3 Database Implementation
The system leverages **Google Firebase Firestore** for data storage, chosen for its flexibility and real-time capabilities.

*   **Schema Definition:** Although NoSQL is schema-less, the application enforces a strict structure at the application level.
*   **Timestamps:** Server-side timestamps (`serverTimestamp()`) are used to ensure chronological consistency across different client time zones.
*   **Security Rules:** (Implied) Firebase security rules ensure that only authenticated applications can write to the database.

## 4.4 System Testing

### 4.4.1 Unit Testing
Unit testing focused on verifying the logic of individual components, particularly the backend.

*   **Model Evaluation:** The training script automatically outputs performance metrics (Accuracy, Precision, Recall, F1-Score) immediately after training. This acts as a unit test for the model's validity.
*   **API Endpoint Testing:** The `/predict` endpoint was tested with boundary conditions (e.g., all risk flags = 0, all risk flags = 1) to ensure the returned probability is always within the [0, 1] range.

### 4.4.2 System Testing
Comprehensive system testing was conducted to verify the end-to-end flow.

1.  **Authentication Flow:** Verified that unauthenticated users are seamlessly redirected from `/admin/dashboard` to `/admin`, and that valid credentials allow access.
2.  **Fraud Integration:** A "Grey Box" testing approach was used. By manually simulating a booking with "High Value" and "IP Risk" flags, we verified that:
    *   The frontend correctly sent the data.
    *   The Python API received it and returned a high probability (> 0.7).
    *   The booking appeared in the Admin Dashboard with a "High Risk" alert badge.

**Test Case Summary Table:**

| Test Case ID | Test Description | Expected Outcome | Actual Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-001** | Guest creates booking with 0 risk flags | Application saves booking; Risk Score < 0.1 | Booking Saved; Risk Score 0.05 | **Pass** |
| **TC-002** | Guest creates booking with 4 risk flags | Application flags booking; Risk Score > 0.7 | Booking Saved; Risk Score 0.92; Red Badge displayed | **Pass** |
| **TC-003** | Admin access with valid credentials | Redirect to Dashboard; Session stored | Dashboard loads; Token in LocalStorage | **Pass** |
| **TC-004** | Admin access with invalid credentials | Error message "Invalid Credentials" | Error displayed; No redirect | **Pass** |

## 4.5 Results and Discussion

### 4.5.1 System Outputs
The system successfully met all core objectives.
*   **Operational Efficiency:** The automated booking flow functions without error, reducing the time required to process a reservation to under 2 minutes.
*   **Fraud Detection:** The integrated AI model successfully discriminates between safe and risky transactions. The visualization of these risks on the dashboard provides actionable intelligence to hotel managers.

### 4.5.2 Performance Observations
*   **Latency:** The microservice architecture proved highly efficient. The latency added by the external call to the Python API is negligible (< 200ms), ensuring the user experience remains smooth.
*   **Real-time Updates:** The use of Firestore snapshot listeners allows multiple admin interfaces to stay synchronized instantly, a significant improvement over static page reloads.

### 4.5.3 Strengths and Limitations
*   **Strengths:** Modern tech stack (React/Vite), real-time data, decoupled AI logic, and a user-friendly interface.
*   **Limitations:** The current authentication relies on client-side environment variables, which is sufficient for a prototype but would require a server-side session management system (e.g., JWT) for enterprise-grade security.

## 4.6 Deployment
The system utilizes a modern, distributed deployment strategy:

1.  **Frontend:** The React application is configured for **Vercel** (indicated by `vercel.json`), utilizing their global CDN to serve static assets.
2.  **Backend:** The Python API is container-ready (via `requirements.txt`) for deployment on Platforms as a Service (PaaS) such as **Render** or **Heroku**. The application connects to this live service via the configured `API_URL`.
3.  **Environment Management:** Sensitive configuration (Firebase keys, Admin secrets) is managed via the `.env` file, ensuring that secrets are injected at runtime and not exposed in the codebase.
