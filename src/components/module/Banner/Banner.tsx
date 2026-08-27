import { getAllActiveBanners } from "@/services/Banner/banner.api";
import BannerContent from "./BannerContent";
import { getAllActiveCampaigns } from "@/services/Campaign/campaign.api";

export default async function Banner() {
  const activeBanner = await getAllActiveBanners();
  const activeCampaign = await getAllActiveCampaigns();
  // console.log("active capmaign",activeCampaign)

  return (
    <div>
      <BannerContent banners={activeCampaign?.data || []}></BannerContent>
    </div>
  );
}
