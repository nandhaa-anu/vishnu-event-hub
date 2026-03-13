import { db } from "./firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy
} from "firebase/firestore";

export interface Notification {
    id?: string;
    userId: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning";
    read: boolean;
    createdAt: any;
}

/**
 * Sends a notification to a specific user.
 */
export const sendNotification = async (
    userId: string,
    title: string,
    message: string,
    type: Notification["type"] = "info"
) => {
    try {
        await addDoc(collection(db, "notifications"), {
            userId,
            title,
            message,
            type,
            read: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

/**
 * Fetches notifications for a user.
 */
export const getUserNotifications = async (userId: string) => {
    const q = query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notification[];
};
