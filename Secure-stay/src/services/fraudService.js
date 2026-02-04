const API_URL = "https://fraud-detection-microservice-2eoi.onrender.com";

/**
 * Sends booking signals to the Python AI Microservice to get a risk score.
 * @param {Object} features - { country_mismatch, rapid_attempts, odd_hour, high_value_booking, device_change, ip_risk }
 * @returns {Promise<number>} - Risk Score (0.0 to 1.0)
 */
export const predictFraud = async (features) => {
    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(features)
        });

        if (!response.ok) {
            console.warn("Fraud detection service returned non-200 status. using fallback.");
            return 0.1; // Fallback low risk if service fails
        }

        const data = await response.json();
        return data.risk_score;
    } catch (error) {
        console.error("Error predicting fraud:", error);
        // Fallback safely so booking doesn't crash
        return 0.1; 
    }
};
