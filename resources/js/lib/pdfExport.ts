import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportDashboardToPDF = async (elementId: string, filename: string = 'dashboard-report.pdf') => {
    // We add a temporary class or styles to the element before targeting if needed, 
    // but for now, we just grab it directly.
    const dashboardElement = document.getElementById(elementId);
    
    if (!dashboardElement) {
        console.error('Element not found');
        return false;
    }

    try {
        // Step 1: Capture the dashboard as a high-res image
        const dataUrl = await toPng(dashboardElement, {
            quality: 1,
            backgroundColor: '#f5f7f9', // Lumina surface background
            pixelRatio: 2, // High resolution for A4 print
            style: {
                // Ensure it captures fully without scrollbars
                transform: 'scale(1)',
            }
        });

        // Step 2: Initialize jsPDF as A4 Portrait
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;

        // Step 3: Draw Kop Surat (Letterhead) on the first page
        const drawHeader = (doc: jsPDF) => {
            // Draw Logo Box
            doc.setFillColor(0, 87, 189); // Primary blue
            doc.rect(margin, margin, 12, 12, 'F');
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.text("HR", margin + 2.5, margin + 8.5);

            // Company Info
            doc.setTextColor(40, 40, 40);
            doc.setFontSize(14);
            doc.text("Lumina Intelligence, Inc.", margin + 15, margin + 4.5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text("Gedung Sudirman Tower Lt. 12, Jl. Jend. Sudirman", margin + 15, margin + 9);
            doc.text("Jakarta Selatan, 12190 - Indonesia", margin + 15, margin + 13);

            // Report Meta Info
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(0, 87, 189);
            doc.text("WORKFORCE INSIGHTS REPORT", pdfWidth - margin, margin + 5, { align: 'right' });
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, pdfWidth - margin, margin + 10, { align: 'right' });
            doc.text(`Oleh: System Administrator`, pdfWidth - margin, margin + 14, { align: 'right' });

            // Divider Line
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(margin, margin + 18, pdfWidth - margin, margin + 18);
        };

        drawHeader(pdf);

        // Step 4: Calculate Image scaling to fit A4 width
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgRatio = imgProps.width / imgProps.height;
        
        const finalWidth = pdfWidth - (margin * 2);
        const finalHeight = finalWidth / imgRatio;

        // Step 5: Pagination (if content is taller than A4 height)
        let yPosition = margin + 25; // Start below header
        let pageHeightLeft = finalHeight;
        
        // Add the first slice
        pdf.addImage(dataUrl, 'PNG', margin, yPosition, finalWidth, finalHeight);
        pageHeightLeft -= (pdfHeight - yPosition - margin); // subtract the visible area

        // Add additional pages if needed
        while (pageHeightLeft > 0) {
            pdf.addPage();
            
            // Re-apply margin from top for subsequent pages
            // Calculate negative translation to shift the image up
            yPosition = yPosition - pdfHeight + (margin * 2);
            
            pdf.addImage(dataUrl, 'PNG', margin, yPosition, finalWidth, finalHeight);
            
            pageHeightLeft -= (pdfHeight - margin * 2);
        }

        // Add page numbers at the bottom of all pages
        const pageCount = pdf.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text(`Halaman ${i} dari ${pageCount}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
        }

        // Step 6: Download
        pdf.save(filename);
        return true;
    } catch (err) {
        console.error('Failed to export PDF', err);
        return false;
    }
};
