import { getAllActiveBanners } from "@/services/Banner/banner.api";
import BannerContent from "./BannerContent";

export default async function Banner() {
  const activeBanner = await getAllActiveBanners();

  console.log(activeBanner, "this is active");
  return (
    <div>
      <BannerContent banners={activeBanner?.data || []}></BannerContent>
    </div>
  );
}
