import ShippingForm from "@/components/module/Checkout/ShippingForm";
import { getUserProfile } from "@/services/Auth/auth.api";

export default async function CheckoutPage() {
  const user = await getUserProfile();
  return (
    <div>
      <ShippingForm user={user || {}}></ShippingForm>
    </div>
  );
}
