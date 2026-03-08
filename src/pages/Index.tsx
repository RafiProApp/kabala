import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ReceiptForm, { type ReceiptData } from "@/components/ReceiptForm";
import ReceiptPreview from "@/components/ReceiptPreview";
import { generatePDF, generatePPTX, sendToWhatsApp } from "@/lib/receiptExport";
import { FileText, Presentation, MessageCircle, Download } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (data: ReceiptData) => {
    setReceiptData(data);
    toast.success("הקבלה נוצרה בהצלחה!");
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePDF = async () => {
    if (!receiptRef.current) return;
    setLoading(true);
    try {
      const blob = await generatePDF(receiptRef.current);
      downloadFile(blob, `קבלה-${receiptData?.receiptNumber || "001"}.pdf`);
      toast.success("PDF הורד בהצלחה!");
    } catch {
      toast.error("שגיאה ביצירת PDF");
    }
    setLoading(false);
  };

  const handlePPTX = async () => {
    if (!receiptRef.current) return;
    setLoading(true);
    try {
      const blob = await generatePPTX(receiptRef.current);
      downloadFile(blob, `קבלה-${receiptData?.receiptNumber || "001"}.pptx`);
      toast.success("PPTX הורד בהצלחה!");
    } catch {
      toast.error("שגיאה ביצירת PPTX");
    }
    setLoading(false);
  };

  const handleWhatsApp = async () => {
    if (!receiptRef.current) return;
    setLoading(true);
    try {
      const blob = await generatePDF(receiptRef.current);
      downloadFile(blob, `קבלה-${receiptData?.receiptNumber || "001"}.pdf`);
      // Give time for download then open WhatsApp
      setTimeout(() => {
        sendToWhatsApp(blob, "0547615911");
      }, 500);
      toast.success("PDF הורד! שלח אותו בוואטסאפ 📱");
    } catch {
      toast.error("שגיאה");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b bg-card py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">מחולל קבלות</h1>
              <p className="text-xs text-muted-foreground">TipTop Computer & Mobile Service</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form side */}
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <h2 className="text-lg font-bold mb-4 font-display">פרטי הקבלה</h2>
            <ReceiptForm onGenerate={handleGenerate} />
          </div>

          {/* Preview side */}
          <div className="space-y-4">
            {receiptData ? (
              <>
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handlePDF} disabled={loading} className="gap-2 flex-1">
                    <Download className="h-4 w-4" />
                    הורד PDF
                  </Button>
                  <Button onClick={handlePPTX} disabled={loading} variant="outline" className="gap-2 flex-1">
                    <Presentation className="h-4 w-4" />
                    הורד PPTX
                  </Button>
                  <Button onClick={handleWhatsApp} disabled={loading} className="gap-2 flex-1 bg-[#25D366] hover:bg-[#20bd5a]">
                    <MessageCircle className="h-4 w-4" />
                    שלח לוואטסאפ
                  </Button>
                </div>

                {/* Receipt preview */}
                <div className="overflow-auto rounded-xl border shadow-sm" style={{ maxHeight: "80vh" }}>
                  <div style={{ transform: "scale(0.75)", transformOrigin: "top right" }}>
                    <ReceiptPreview ref={receiptRef} data={receiptData} />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-card rounded-xl p-12 shadow-sm border flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground">הקבלה תופיע כאן</h3>
                <p className="text-muted-foreground mt-2 text-sm">מלא את הפרטים בטופס ולחץ "צור קבלה"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
