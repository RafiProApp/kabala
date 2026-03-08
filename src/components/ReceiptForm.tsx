import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

export interface ReceiptItem {
  product: string;
  price: number;
  quantity: number;
}

export interface ReceiptData {
  customerName: string;
  date: string;
  receiptNumber: string;
  items: ReceiptItem[];
  paymentMethod: string;
  customerPhone: string;
}

interface ReceiptFormProps {
  onGenerate: (data: ReceiptData) => void;
}

const ReceiptForm = ({ onGenerate }: ReceiptFormProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [data, setData] = useState<ReceiptData>({
    customerName: "",
    date: today,
    receiptNumber: "",
    items: [{ product: "", price: 0, quantity: 1 }],
    paymentMethod: "מזומן",
    customerPhone: "",
  });

  const updateItem = (index: number, field: keyof ReceiptItem, value: string | number) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const addItem = () => {
    setData({ ...data, items: [...data.items, { product: "", price: 0, quantity: 1 }] });
  };

  const removeItem = (index: number) => {
    if (data.items.length > 1) {
      setData({ ...data, items: data.items.filter((_, i) => i !== index) });
    }
  };

  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(data);
  };

  return (
    <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">שם לקוח *</Label>
          <Input
            required
            value={data.customerName}
            onChange={(e) => setData({ ...data, customerName: e.target.value })}
            placeholder="שם הלקוח"
            className="text-right"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">תאריך</Label>
          <Input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">מספר קבלה</Label>
          <Input
            value={data.receiptNumber}
            onChange={(e) => setData({ ...data, receiptNumber: e.target.value })}
            placeholder="#02022"
            className="text-right"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">טלפון לקוח (אופציונלי)</Label>
          <Input
            value={data.customerPhone}
            onChange={(e) => setData({ ...data, customerPhone: e.target.value })}
            placeholder="050-0000000"
            className="text-right"
          />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        <Label className="text-sm font-bold">מוצרים / שירותים</Label>
        {data.items.map((item, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5 space-y-1">
              {i === 0 && <Label className="text-xs text-muted-foreground">מוצר</Label>}
              <Input
                required
                value={item.product}
                onChange={(e) => updateItem(i, "product", e.target.value)}
                placeholder="שם המוצר / שירות"
                className="text-right"
              />
            </div>
            <div className="col-span-2 space-y-1">
              {i === 0 && <Label className="text-xs text-muted-foreground">מחיר ₪</Label>}
              <Input
                type="number"
                required
                min={0}
                value={item.price || ""}
                onChange={(e) => updateItem(i, "price", Number(e.target.value))}
                className="text-center"
              />
            </div>
            <div className="col-span-2 space-y-1">
              {i === 0 && <Label className="text-xs text-muted-foreground">כמות</Label>}
              <Input
                type="number"
                required
                min={1}
                value={item.quantity}
                onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                className="text-center"
              />
            </div>
            <div className="col-span-2 space-y-1">
              {i === 0 && <Label className="text-xs text-muted-foreground">סה״כ</Label>}
              <div className="h-10 flex items-center justify-center rounded-md bg-muted font-medium text-sm">
                ₪{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
            <div className="col-span-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(i)}
                className="h-10 w-10"
                disabled={data.items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-2">
          <Plus className="h-4 w-4" />
          הוסף מוצר
        </Button>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center p-4 rounded-lg bg-accent">
        <span className="text-2xl font-bold font-display text-primary">₪{total.toLocaleString()}</span>
        <span className="font-bold text-lg">סה״כ לתשלום</span>
      </div>

      {/* Payment method */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">אופן תשלום</Label>
        <Select value={data.paymentMethod} onValueChange={(v) => setData({ ...data, paymentMethod: v })}>
          <SelectTrigger className="text-right">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="מזומן">מזומן</SelectItem>
            <SelectItem value="העברה בנקאית">העברה בנקאית</SelectItem>
            <SelectItem value="אשראי">אשראי</SelectItem>
            <SelectItem value="ביט">ביט</SelectItem>
            <SelectItem value="פייבוקס">פייבוקס</SelectItem>
            <SelectItem value="צ'ק">צ׳ק</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" size="lg" className="w-full text-lg font-bold gap-2">
        צור קבלה
      </Button>
    </form>
  );
};

export default ReceiptForm;
