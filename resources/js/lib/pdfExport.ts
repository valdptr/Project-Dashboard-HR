import { toJpeg } from 'html-to-image';
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
        // Step 1: Capture the dashboard as a high-res JPG to save space
        const dataUrl = await toJpeg(dashboardElement, {
            quality: 0.85,
            backgroundColor: '#f5f7f9', // Lumina surface background
            pixelRatio: 1.5, // Reduced slightly to avoid massive 15MB Blobs
            style: {
                // Ensure it captures fully without scrollbars
                transform: 'scale(1)',
            }
        });

        // Load logo
        const loadLogo = (): Promise<HTMLImageElement | null> => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => {
                console.warn("Logo failed to load");
                resolve(null); // Resolve to null so it doesn't crash the PDF generator
            };
            img.src = '/images/company-logo.png';
        });
        const logoImg = await loadLogo();

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
            // Draw Logo Image if it exists
            if (logoImg) {
                doc.addImage(logoImg, 'PNG', margin, margin, 40, 15);
            }

            // Company Info
            doc.setTextColor(40, 40, 40);
            doc.setFontSize(13);
            doc.setFont("helvetica", "bold");
            doc.text("PT. SUMATERA BAHTERA RAYA", margin + 45, margin + 4.5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text("35226, Jl. Yos Sudarso No.281, Sukaraja, Kec. Bumi Waras", margin + 45, margin + 9);
            doc.text("Kota Bandar Lampung, Lampung 35226", margin + 45, margin + 13);

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
        pdf.addImage(dataUrl, 'JPEG', margin, yPosition, finalWidth, finalHeight);
        pageHeightLeft -= (pdfHeight - yPosition - margin); // subtract the visible area

        // Add additional pages if needed
        while (pageHeightLeft > 0) {
            pdf.addPage();
            
            // Re-apply margin from top for subsequent pages
            // Calculate negative translation to shift the image up
            yPosition = yPosition - pdfHeight + (margin * 2);
            
            pdf.addImage(dataUrl, 'JPEG', margin, yPosition, finalWidth, finalHeight);
            
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
