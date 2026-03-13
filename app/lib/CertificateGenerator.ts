import { jsPDF } from "jspdf";

export interface CertificateData {
    studentName: string;
    rollNo: string;
    eventName: string;
    clubName: string;
    date: string;
    certificateId: string;
}

/**
 * Generates a certificate as a PDF.
 * If a templateURL is provided, it uses it as the background image.
 */
export const generateCertificate = async (
    data: CertificateData,
    templateURL?: string
): Promise<Blob> => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [800, 600],
    });

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    if (templateURL) {
        try {
            // Add template image
            const img = new Image();
            img.src = templateURL;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            doc.addImage(img, "PNG", 0, 0, width, height);
        } catch (e) {
            console.warn("Could not load certificate template. Falling back to default design.", e);
            drawDefaultDesign(doc, width, height);
        }
    } else {
        drawDefaultDesign(doc, width, height);
    }

    // Overlay Student Data
    doc.setTextColor(20, 30, 60); // Darker blue-black

    // Student Name
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text(data.studentName.toUpperCase(), width / 2, 280, { align: "center" });

    // Roll Number
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Roll Number: ${data.rollNo}`, width / 2, 310, { align: "center" });

    // Event Context
    doc.setFontSize(18);
    doc.text(`for participating in "${data.eventName}"`, width / 2, 350, { align: "center" });
    doc.text(`organized by ${data.clubName}`, width / 2, 375, { align: "center" });

    // Date
    doc.setFontSize(14);
    doc.text(`Date: ${data.date}`, 100, 480);

    // Certificate ID & Verification
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Certificate ID: ${data.certificateId}`, width / 2, 550, { align: "center" });
    doc.text("Verified by Vishnu Event Hub", width / 2, 565, { align: "center" });

    return doc.output("blob");
};

const drawDefaultDesign = (doc: jsPDF, width: number, height: number) => {
    // Border
    doc.setLineWidth(20);
    doc.setDrawColor(11, 15, 26); // Primary color
    doc.rect(0, 0, width, height, "S");

    doc.setLineWidth(2);
    doc.setDrawColor(37, 99, 235); // Accent blue
    doc.rect(30, 30, width - 60, height - 60, "S");

    // Header Decorations
    doc.setFillColor(37, 99, 235);
    doc.triangle(0, 0, 100, 0, 0, 100, "F");

    doc.setFillColor(124, 58, 237); // Accent violet
    doc.triangle(width, height, width - 100, height, width, height - 100, "F");

    // Titles
    doc.setTextColor(11, 15, 26);
    doc.setFontSize(48);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE", width / 2, 120, { align: "center" });

    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("OF PARTICIPATION", width / 2, 150, { align: "center" });

    doc.setFontSize(12);
    doc.text("THIS CERTIFICATE IS PROUDLY PRESENTED TO", width / 2, 230, { align: "center" });
};
