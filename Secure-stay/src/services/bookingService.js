import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, orderBy, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'bookings';

// Save a new booking to Firestore
export const createBooking = async (bookingData) => {
    try {
        // Use a custom ID (Reference ID) if possible, or let Firestore generate one
        // Here asking Firestore to generate, but we store the ref inside
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...bookingData,
            createdAt: serverTimestamp() // Server-side time for consistency
        });
        return { firestoreId: docRef.id, ...bookingData };
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

// Retrieve booking by ID (used for Tracking)
export const getBookingByRef = async (refId) => {
    try {
        // We'll search by the field 'id' which stores our REF-XXXX format
        // This requires a query since doc ID is random
        const q = query(collection(db, COLLECTION_NAME));
        const querySnapshot = await getDocs(q);
        
        // Client-side filter for simplicity now (in prod, use 'where' clause with index)
        const found = querySnapshot.docs.find(doc => doc.data().id === refId);
        
        if (found) {
            return { firestoreId: found.id, ...found.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching booking:", error);
        return null;
    }
};

// Admin: Listen to all bookings in real-time
export const subscribeToBookings = (callback) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
        const bookings = [];
        querySnapshot.forEach((doc) => {
             // Convert Firestore Timestamp to readable date if needed
            const data = doc.data();
            let dateStr = 'Just now';
            if (data.createdAt) {
                dateStr = new Date(data.createdAt.seconds * 1000).toLocaleString();
            }
            
            bookings.push({ 
                firestoreId: doc.id, 
                ...data,
                date: dateStr // Override or augment date for display
            });
        });
        callback(bookings);
    });
};
