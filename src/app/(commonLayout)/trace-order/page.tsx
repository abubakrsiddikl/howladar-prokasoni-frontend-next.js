// src/app/trace-order/page.tsx
import OrderTraceContent from "@/components/module/Order/OrderTrace/OrderTraceContent";

export default function OrderTracePage() {
  // Server Component টি শুধুমাত্র Client Component কে রেন্ডার করবে
  return (
    <div>
      <OrderTraceContent />
    </div>
  );
}