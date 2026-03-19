import { jsPDF } from "jspdf";

/**
 * Extracts branch from roll number.
 * Example: 20PA1A05XX -> 05 corresponds to CSE.
 */
export const getBranchFromRollNo = (rollNo: string): string => {
    const branchCode = rollNo.substring(6, 8);
    const branches: { [key: string]: string } = {
        "05": "Computer Science and Engineering (CSE)",
        "04": "Electronics and Communication Engineering (ECE)",
        "02": "Electrical and Electronics Engineering (EEE)",
        "03": "Mechanical Engineering (ME)",
        "01": "Civil Engineering (CE)",
        "12": "Information Technology (IT)",
        "42": "Artificial Intelligence and Data Science (AI & DS)",
        "44": "Artificial Intelligence and Machine Learning (AI & ML)",
    };
    return branches[branchCode] || "General";
};

export interface RegisteredStudent {
    name: string;
    rollNo: string;
    branch: string;
}

export const generateHODLetter = (
    clubName: string,
    eventName: string,
    eventDate: string,
    branchName: string,
    students: RegisteredStudent[]
) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("VISHNU INSTITUTE OF TECHNOLOGY", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("BHIMAVARAM", pageWidth / 2, 28, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 35, pageWidth - 20, 35);

    // Letter Body
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 45);

    doc.text("To,", 20, 60);
    doc.setFont("helvetica", "bold");
    doc.text("The Head of Department,", 20, 68);
    doc.text(`${branchName},`, 20, 76);
    doc.text("Vishnu Institute of Technology.", 20, 84);

    doc.setFont("helvetica", "normal");
    doc.text("Subject: Permission request for students to attend event - reg.", 20, 100, {
        maxWidth: pageWidth - 40,
    });

    doc.text("Respected Sir/Madam,", 20, 115);

    const bodyText = `The ${clubName} is organizing a campus-wide event "${eventName}" on ${eventDate}. We are pleased to inform you that several students from your department have registered for this event. We request you to kindly grant them permission to participate and consider their attendance for the duration of the event.`;

    doc.text(bodyText, 20, 125, {
        maxWidth: pageWidth - 40,
        align: "justify",
    });

    doc.setFont("helvetica", "bold");
    doc.text("List of Students:", 20, 155);

    // Student Table
    let yPos = 165;
    doc.setFontSize(10);
    doc.text("S.No", 25, yPos);
    doc.text("Name", 45, yPos);
    doc.text("Roll Number", 120, yPos);

    doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    students.forEach((student, index) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`${index + 1}`, 25, yPos);
        doc.text(student.name, 45, yPos);
        doc.text(student.rollNo, 120, yPos);
        yPos += 8;
    });

    yPos += 20;
    if (yPos > 270) {
        doc.addPage();
        yPos = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text("Yours sincerely,", 20, yPos);
    yPos += 8;
    doc.text(`Coordinator, ${clubName}`, 20, yPos);

    doc.save(`HOD_Letter_${branchName.split(" ")[0]}_${eventName.replace(/\s+/g, "_")}.pdf`);
};
