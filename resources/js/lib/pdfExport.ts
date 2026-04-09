import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportDashboardToPDF = async (elementId: string, filename: string = 'dashboard-report.pdf') => {
    const dashboardElement = document.getElementById(elementId);
    
    if (!dashboardElement) {
        console.error('Element not found');
        return false;
    }

    try {
        // Find charts to ensure they rendered properly (optional wait logic could be added)
        // Convert the DOM to a PNG image
        const dataUrl = await toPng(dashboardElement, {
            quality: 1,
            backgroundColor: document.documentElement.classList.contains('dark') ? '#020617' : '#ffffff',
            pixelRatio: 2, // Higher resolution
        });

        // Initialize jsPDF
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate image dimensions to fit the PDF
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgRatio = imgProps.width / imgProps.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth, finalHeight;
        if (imgRatio > pdfRatio) {
            finalWidth = pdfWidth - 20; // 10mm margin each side
            finalHeight = finalWidth / imgRatio;
        } else {
            finalHeight = pdfHeight - 20;
            finalWidth = finalHeight * imgRatio;
        }

        // Add a nice header
        pdf.setFontSize(16);
        pdf.setTextColor(40, 40, 40);
        pdf.text('Laporan Analitik HR', 10, 15);
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Diekspor pada: ${new Date().toLocaleString('id-ID')}`, 10, 22);

        // Add the dashboard image
        const startX = (pdfWidth - finalWidth) / 2;
        pdf.addImage(dataUrl, 'PNG', startX, 30, finalWidth, finalHeight);

        // Download
        pdf.save(filename);
        return true;
    } catch (err) {
        console.error('Failed to export PDF', err);
        return false;
    }
};
