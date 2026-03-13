import { db, storage } from "./firebase";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { generateHODLetter, getBranchFromRollNo, RegisteredStudent } from "./HODLetterGenerator";
import { generateCertificate, CertificateData } from "./CertificateGenerator";

/**
 * Event Interface
 */
export interface Event {
    id: string;
    eventName: string;
    date: string;
    venue: string;
    latitude: number;
    longitude: number;
    googleMapsLink: string;
    posterURL: string;
    organizerId: string;
    maxParticipants: number;
    status: "open" | "closed" | "completed";
    clubName: string;
    certificateTemplateURL?: string;
}

/**
 * Registration Interface
 */
export interface Registration {
    id: string;
    eventId: string;
    userId: string;
    name: string;
    rollNo: string;
    branch: string;
    status: "registered" | "attended";
    ticketId: string;
    createdAt: any;
}

/**
 * Registers a student for an event.
 */
export const registerForEvent = async (eventId: string, userId: string, name: string, rollNumber: string, branch: string) => {
    // 1. Check if already registered
    const existingQuery = query(
        collection(db, "registrations"),
        where("eventId", "==", eventId),
        where("rollNumber", "==", rollNumber)
    );
    const existingSnap = await getDocs(existingQuery);

    if (!existingSnap.empty) {
        throw new Error("Already registered for this event.");
    }

    // 2. Generate Ticket ID
    const ticketId = `TKT-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${rollNumber.substring(rollNumber.length - 4)}`;

    // 3. Create Registration Record
    const registrationData = {
        eventId,
        userId,
        name,
        rollNumber,
        branch,
        status: "registered",
        ticketId,
        createdAt: serverTimestamp()
    };

    const regDocRef = await addDoc(collection(db, "registrations"), registrationData);

    // 4. Create Ticket Record
    await setDoc(doc(db, "tickets", ticketId), {
        ticketId,
        studentName: name,
        rollNumber,
        eventId,
        registrationId: regDocRef.id,
        status: "active",
        createdAt: serverTimestamp()
    });

    return { success: true, ticketId };
};

/**
 * Closes registrations for an event and generates HOD letters for each branch.
 */
export const closeRegistrations = async (eventId: string) => {
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) throw new Error("Event not found");
    const eventData = eventSnap.data() as Event;

    // 1. Update event status
    await updateDoc(eventRef, { status: "closed" });

    // 2. Fetch all registered students
    const registrationsQuery = query(
        collection(db, "registrations"),
        where("eventId", "==", eventId)
    );
    const regSnap = await getDocs(registrationsQuery);
    const registrations = regSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Registration[];

    // 3. Divide by branch
    const branchMap: { [key: string]: RegisteredStudent[] } = {};
    registrations.forEach(reg => {
        if (!branchMap[reg.branch]) branchMap[reg.branch] = [];
        branchMap[reg.branch].push({
            name: reg.name,
            rollNo: reg.rollNo,
            branch: reg.branch
        });
    });

    // 4. Generate HOD Letters (Triggered local download in this implementation)
    Object.keys(branchMap).forEach(branch => {
        generateHODLetter(
            eventData.clubName,
            eventData.eventName,
            eventData.date,
            branch,
            branchMap[branch]
        );
    });

    return { success: true, branches: Object.keys(branchMap) };
};

/**
 * Completes an event and triggers automatic certificate generation for attendees.
 */
export const completeEvent = async (eventId: string) => {
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) throw new Error("Event not found");
    const eventData = eventSnap.data() as Event;

    // 1. Update event status
    await updateDoc(eventRef, { status: "completed" });

    // 2. Fetch all attendees
    const attendeesQuery = query(
        collection(db, "registrations"),
        where("eventId", "==", eventId),
        where("status", "==", "attended")
    );
    const attendeeSnap = await getDocs(attendeesQuery);
    const attendees = attendeeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Registration[];

    // 3. Generate and upload certificates for each attendee
    const certPromises = attendees.map(async (attendee) => {
        const certId = `CERT-${attendee.rollNo}-${eventId.substring(0, 4)}`.toUpperCase();

        const certData: CertificateData = {
            studentName: attendee.name,
            rollNo: attendee.rollNo,
            eventName: eventData.eventName,
            clubName: eventData.clubName,
            date: eventData.date,
            certificateId: certId
        };

        // Generate PDF Blob
        const certBlob = await generateCertificate(certData, eventData.certificateTemplateURL);

        // Upload to Firebase Storage
        const storagePath = `certificates/${attendee.rollNo}_${eventId}.pdf`;
        const certRef = ref(storage, storagePath);
        await uploadBytes(certRef, certBlob);
        const certURL = await getDownloadURL(certRef);

        // Save to certificates collection
        await setDoc(doc(db, "certificates", certId), {
            certId,
            eventId,
            userId: attendee.userId,
            rollNo: attendee.rollNo,
            eventName: eventData.eventName,
            url: certURL,
            issuedAt: serverTimestamp()
        });

        return certURL;
    });

    await Promise.all(certPromises);

    return { success: true, count: attendees.length };
};
