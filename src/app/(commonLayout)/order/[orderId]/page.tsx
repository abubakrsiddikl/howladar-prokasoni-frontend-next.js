import OrderDetailsCard from "@/components/module/Order/OrderDetailsCard";
import { getUserProfile } from "@/services/Auth/auth.api";
import { getSingleOrder } from "@/services/Order/order.api";

export default async function OrderDetailsPage(props: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await props.params;
  
  const user = await getUserProfile();
  const order = await getSingleOrder(orderId);
  return (
    <div>
      <OrderDetailsCard
        order={order?.data || []}
        user={user || {}}
      ></OrderDetailsCard>
    </div>
  );
}
