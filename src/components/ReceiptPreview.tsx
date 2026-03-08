import { forwardRef } from "react";
import type { ReceiptData } from "./ReceiptForm";
import tiptopLogo from "@/assets/tiptop-logo.jpg";

interface Props {
  data: ReceiptData;
}

const ReceiptPreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("he-IL")
    : "";

  return (
    <div
      ref={ref}
      id="receipt-preview"
      dir="rtl"
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#fff",
        fontFamily: "'Heebo', sans-serif",
        color: "#2d3748",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orange left bar */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "8px",
          background: "#d4633a",
        }}
      />

      {/* Header with logo */}
      <div style={{ textAlign: "center", padding: "30px 40px 20px" }}>
        <img src={tiptopLogo} alt="TipTop Logo" style={{ height: "100px", margin: "0 auto" }} />
        <div style={{ fontSize: "14px", color: "#3182ce", fontWeight: 500, marginTop: "4px" }}>
          TipTop-Tech.co.il
        </div>
      </div>

      {/* בס״ד */}
      <div style={{ position: "absolute", left: "30px", top: "20px", fontSize: "14px", color: "#718096" }}>
        בס״ד
      </div>

      {/* Receipt title area */}
      <div style={{ padding: "0 50px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "12px", color: "#718096" }}>{formattedDate}</div>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>TipTop – Security</div>
          <div style={{ fontSize: "13px", color: "#718096" }}>Computer-Service</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#3182ce", margin: 0, lineHeight: 1 }}>
            קבלה
          </h1>
          <div style={{ fontSize: "16px", fontWeight: 700, marginTop: "8px" }}>
            לכבוד: {data.customerName}
          </div>
          {data.customerPhone && (
            <div style={{ fontSize: "13px", color: "#718096", marginTop: "2px" }}>
              טלפון: {data.customerPhone}
            </div>
          )}
        </div>
      </div>

      {/* Receipt number */}
      <div style={{ padding: "20px 50px 10px", textAlign: "left" }}>
        <div style={{ fontSize: "16px", fontWeight: 700 }}>
          מס קבלה {data.receiptNumber || "#00000"}
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "0 50px" }}>
        <div style={{ borderTop: "2px solid #d4633a", borderBottom: "2px solid #d4633a" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "12px 8px", textAlign: "right", fontSize: "14px", fontWeight: 700 }}>מוצר</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>מחיר</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>כמות</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>סה״כ</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #edf2f7" }}>
                  <td style={{ padding: "12px 8px", textAlign: "right", fontSize: "14px" }}>{item.product}</td>
                  <td style={{ padding: "12px 8px", textAlign: "center", fontSize: "14px" }}>₪{item.price.toLocaleString()}</td>
                  <td style={{ padding: "12px 8px", textAlign: "center", fontSize: "14px" }}>{item.quantity}</td>
                  <td style={{ padding: "12px 8px", textAlign: "center", fontSize: "14px" }}>₪{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total */}
      <div style={{ padding: "20px 50px", textAlign: "right" }}>
        <span style={{ fontSize: "20px", fontWeight: 800 }}>סה״כ: {total.toLocaleString()}</span>
      </div>

      {/* Payment method */}
      <div style={{ padding: "30px 50px 10px", textAlign: "center" }}>
        <div style={{ fontSize: "22px", fontWeight: 700 }}>שולם</div>
        <div style={{ fontSize: "16px", marginTop: "8px" }}>אופן התשלום:</div>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>{data.paymentMethod}</div>
      </div>

      {/* Footer with business info + orange bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 50px 30px",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "4px solid #d4633a",
        }}
      >
        <div style={{ fontSize: "12px", color: "#718096", lineHeight: 1.8 }}>
          <div>mr.refaelohayon@gmail.com</div>
          <div>054-761-5911</div>
          <div>שי עגנון 12 אשקלון</div>
        </div>
        <div style={{ fontSize: "12px", color: "#718096", lineHeight: 1.8, textAlign: "right" }}>
          <div style={{ fontWeight: 700, color: "#2d3748" }}>פרטי חשבון בנק להעברת כספים</div>
          <div>בנק פועלים מספר 12</div>
          <div>סניף 770</div>
          <div>מספר חשבון 247530</div>
        </div>
        <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", fontSize: "11px", color: "#a0aec0" }}>
          ח.פ 322650961
        </div>
      </div>
    </div>
  );
});

ReceiptPreview.displayName = "ReceiptPreview";
export default ReceiptPreview;
