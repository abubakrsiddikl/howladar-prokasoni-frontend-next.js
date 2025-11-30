import MyProfile from "@/components/module/MyProfile/MyProfile";
import { getUserProfile } from "@/services/Auth/auth.api";

const MyProfilePage = async () => {
  const userInfo = await getUserProfile();
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
