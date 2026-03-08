import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PptxGenJS from "pptxgenjs";

export async function generatePDF(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  return pdf.output("blob");
}

export async function generatePPTX(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pptx = new PptxGenJS();
  const slide = pptx.addSlide();
  
  slide.addImage({
    data: imgData,
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
    sizing: { type: "contain", w: 10, h: 7.5 },
  });

  return await pptx.write({ outputType: "blob" }) as Blob;
}

export function sendToWhatsApp(pdfBlob: Blob, phone: string) {
  // WhatsApp Web doesn't support file attachments via URL
  // We open WhatsApp with a message and user can share the downloaded file
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const israelPhone = cleanPhone.startsWith("0") ? "972" + cleanPhone.slice(1) : cleanPhone;
  const message = encodeURIComponent("קבלה חדשה מ-TipTop 📄✅");
  window.open(`https://wa.me/${israelPhone}?text=${message}`, "_blank");
}
