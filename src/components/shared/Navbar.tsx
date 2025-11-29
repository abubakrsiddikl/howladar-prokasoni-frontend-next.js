import { getUserProfile } from "@/services/Auth/auth.api";
import NavbarComponent from "./NavbarComponent";

const Navbar = async () => {
  const user = await getUserProfile();
  console.log(user)
  return (
    <>
      <NavbarComponent user={user}></NavbarComponent>
    </>
  );
};

export { Navbar };
