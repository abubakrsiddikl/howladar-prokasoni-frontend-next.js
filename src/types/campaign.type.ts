export interface ICampaign {
  _id?: string;
  title: string;
  slug: string;
  // link?: string;
  bannerImage: string;
  description: string;
  campaignPrice: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}