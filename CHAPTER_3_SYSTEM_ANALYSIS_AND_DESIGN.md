# CHAPTER THREE: SYSTEM ANALYSIS AND DESIGN

## 3.1 Introduction
This chapter presents a comprehensive analysis and design of the "Secure-Stay" hotel booking and fraud detection system. It details the transition from traditional, manual booking processes to an automated, intelligent platform capable of real-time risk assessment. The chapter covers the analysis of the existing system, the proposed system's architecture, functional and non-functional requirements, and the detailed design models including database schemas and system algorithms. The primary objective is to define a robust technical framework that ensures secure, efficient, and user-friendly hotel management.

## 3.2 Analysis of Existing System
The prevailing methodology for hotel booking management in the target context is characterized by significant inefficiencies and security vulnerabilities.

### Limitations of Current Processes
1.  **Manual Verification:** In many mid-sized hotels, bookings are recorded via phone or walk-in and managed in spreadsheets or physical logbooks. This introduces human error and data redundancy.
2.  **Lack of Pre-emptive Fraud Detection:** Current systems perform verification only upon the guest's physical arrival. This reactive approach leaves hotels vulnerable to "no-shows," fake bookings, and payment fraud, as there is no mechanism to assess the intent of a booking before it is confirmed.
3.  **Data Fragmentation:** Guest data, financial records, and operational logs are often decentralized, making it difficult to generate cohesive analytics or identify historical fraud patterns.
4.  **Security Risks:** Without encryption or digital access controls, sensitive guest information is susceptible to unauthorized access and manipulation.

## 3.3 Proposed System
"Secure-Stay" is designed as a web-based automated booking platform integrated with a Machine Learning (ML) microservice. It aims to modernize hotel operations by digitizing the entire reservation lifecycle while embedding intelligence security measures.

### 3.3.1 System Purpose
The primary purpose is to provide a seamless booking experience for guests and a powerful administrative tool for hotel managers, distinguished by its ability to predict and flag fraudulent transactions in real-time.

### 3.3.2 Target Users
*   **Guests:** Individuals seeking to search for accommodation, view hotel details, and make secure reservations.
*   **Administrators:** Hotel staff and managers responsible for overseeing bookings, monitoring occupancy, and handling high-risk alerts.

### 3.3.3 Core Objectives
1.  **Automation:** To automate the booking process from search to confirmation, reducing administrative overhead.
2.  **Fraud Prevention:** To utilize a Logistic Regression model to analyze booking metadata (e.g., IP anomalies, device changes) and assign a "Risk Score" to every transaction.
3.  **Centralized Management:** To provide a unified dashboard for tracking bookings, revenue, and security alerts.

## 3.4 System Requirements

### 3.4.1 Functional Requirements
These requirements define the specific behaviors and functions implemented in the system source code.

**1. Guest Module:**
*   **Hotel Search & Discovery:** Users can browse a catalog of hotels, filtered by location and amenities.
*   **Room Selection:** Users can view specific room types with associated prices and features.
*   **Booking Submission:** Users must complete a detailed form collecting personal data and payment intent.
*   **Booking Tracking:** Users can track the status of their reservation using a unique Reference ID.

**2. Administration Module:**
*   **Secure Authentication:** Administrators must log in using secure credentials to access the backend dashboard.
*   **Dashboard Analytics:** The system must display real-time metrics for Total Bookings, Revenue, and Fraud Attempts using graphical charts.
*   **Booking Management:** Admins can view a comprehensive list of all bookings, filter by status (Pending, Confirmed, Cancelled), and view detailed risk reports.

**3. Intelligence Module:**
*   **Risk Scoring:** The system must automatically calculate a probability score (0.0 to 1.0) for every new booking based on six specific risk factors.
*   **Alerting:** Bookings with a high risk score must be visually differentiated (e.g., Red Badge) to alert administrators.

### 3.4.2 Non-Functional Requirements
**1. Security:**
*   **Authentication:** The system implements protected routes (`ProtectedRoute.jsx`) to restrict access to sensitive admin pages.
*   **Data Validation:** Both frontend and backend implement strict validation (e.g., Pydantic models in Python) to prevent malformed data injection.
*   **Environment Security:** Sensitive API keys and credentials are managed via environment variables (`.env`), ensuring they are not hardcoded.

**2. Performance:**
*   **Asynchronous Processing:** Network requests to the fraud detection API and database are handled asynchronously to ensure a non-blocking user interface.
*   **Optimization:** The frontend is built with Vite, utilizing efficient bundling and lazy loading strategies to minimize initial load times.

**3. Scalability:**
*   **Cloud Database:** Utilization of Firebase Firestore allows the database to scale horizontally with increasing data volume without manual sharding.
*   **Microservice Architecture:** The decoupled Python API can be scaled independently of the main application to handle high volumes of fraud analysis requests.

**4. Maintainability:**
*   **Modular Code Structure:** The codebase follows a separation of concerns, organized into distinctive directories for `components`, `services`, `pages`, and `hooks`.

## 3.5 System Architecture
The system adopts a **Service-Oriented Architecture (SOA)** combined with a **Client-Server** model to ensure modularity and scalability.

**1. Frontend (Client Layer):**
*   **Technology:** React.js (v19) with Vite.
*   **Role:** Handles user interaction, state management, and visual rendering. It serves as the presentation layer, consuming APIs for data.

**2. Backend (Intelligence Layer):**
*   **Technology:** Python FastAPI.
*   **Role:** Acts as a specialized microservice hosting the Machine Learning model. It exposes RESTful endpoints (e.g., `/predict`) to process risk factors and return fraud probabilities.

**3. Database Layer:**
*   **Technology:** Google Firebase Firestore.
*   **Role:** A serverless, NoSQL document database that stores all persistent data, including booking records, user profiles, and audit logs.

**4. Request Flow:**
1.  **Input:** Guest submits booking details via the React Frontend.
2.  **Analysis:** The Frontend extracts risk features and sends a request to the Python Microservice.
3.  **Scoring:** The Microservice loads the pre-trained model, calculates the fraud probability, and returns the score.
4.  **Persistence:** The Frontend attaches this score to the booking object and saves the complete record to Firestore.
5.  **Monitoring:** The Admin Dashboard listens for Firestore updates and displays the new booking in real-time.

## 3.6 System Design Models

### 3.6.1 Use Case Diagram Description
*   **Actor: Guest**
    *   *Search Hotels:* Initiates a query to find available properties.
    *   *View Details:* Examines hotel amenities, location, and room options.
    *   *Make Booking:* Submits personal details and payment information.
    *   *Track Booking:* Uses a reference ID to check the status of a reservation.
*   **Actor: Administrator**
    *   *Login:* Authenticates into the secure admin portal.
    *   *View Analytics:* Monitors the dashboard for occupancy and revenue trends.
    *   *Manage Bookings:* Reviews booking details and takes action on flagged transactions.

### 3.6.2 Implementation Class Structure
*   **`BookingService` (JavaScript):** Manages all database interactions, including `createBooking()`, `getBookingByRef()`, and real-time `subscribeToBookings()`.
*   **`FraudService` (JavaScript):** Handles communication with the AI microservice via `predictFraud(features)`.
*   **`FraudAPI` (Python):** The FastAPI application class defining the `/predict` route and data models (`BookingRisk`).

### 3.6.3 Database Design (ER Model Description)
The system utilizes a NoSQL schema-less design, but the data structure is standardized as follows:

**Collection: `bookings`**
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` / `firestoreId` | String (PK) | Unique identifier for the document. |
| `guestName` | String | Full name of the guest. |
| `email` | String | Contact email address. |
| `hotelName` | String | Name of the booked property. |
| `roomType` | String | Service level/room category. |
| `totalAmount` | Number | Total cost of the stay. |
| `status` | String | Current state ('Pending', 'Confirmed', 'Flagged'). |
| `risk_score` | Number | Calculated fraud probability (0.0 to 1.0). |
| `createdAt` | Timestamp | Server-side timestamp of creation. |
| `flags` | Map/Object | specific risk indicators (e.g., `ip_risk: 1`). |

## 3.8 System Flow / Algorithms

### 3.8.1 Fraud Detection Algorithm (Logistic Regression)
The core intelligence mechanism is a supervised learning algorithm implemented in `fraud_detection.py`.

1.  **Feature Extraction:** The system extracts six binary features from the booking context:
    *   `country_mismatch`: Does the IP country match the billing address?
    *   `rapid_attempts`: Multiple bookings in a short timeframe?
    *   `odd_hour`: Booking made between 12 AM and 5 AM?
    *   `high_value_booking`: Transaction amount exceeds threshold?
    *   `device_change`: Frequent device switching detected?
    *   `ip_risk`: IP address present on blacklists?

2.  **Probability Calculation:**
    The Logistic Regression model (trained via `sklearn`) applies a sigmoid function to the weighted sum of these inputs:
    $$ P(y=1|X) = \frac{1}{1 + e^{-(\beta_0 + \beta_1x_1 + ... + \beta_nx_n)}} $$
    Where $P$ is the probability of fraud.

3.  **Decision Logic:**
    *   If $P < 0.3$: **Low Risk** (Green)
    *   If $0.3 \le P < 0.7$: **Medium Risk** (Yellow)
    *   If $P \ge 0.7$: **High Risk** (Red/Flagged)

## 3.9 Development Tools
*   **Frontend:** React.js, Tailwind CSS, Lucide Icons.
*   **Backend:** Python 3.x, FastAPI.
*   **Machine Learning:** Scikit-Learn, Pandas, NumPy, Joblib.
*   **Database:** Firebase Firestore (Cloud NoSQL).
*   **Versioning:** Git & GitHub.
*   **Deployment:** Vercel (Frontend), Render/Heroku (Backend Microservice).
