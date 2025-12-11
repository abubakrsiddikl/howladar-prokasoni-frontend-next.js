import { getUserProfile } from "@/services/Auth/auth.api";
import NavbarComponent from "./NavbarComponent";
import { getAllGenres } from "@/services/Genre/genre.api";

const Navbar = async () => {
  const user = await getUserProfile();
  const genres = await getAllGenres();

  return (
    <>
      <NavbarComponent user={user} genres={genres.data || []}></NavbarComponent>
    </>
  );
};

export { Navbar };
