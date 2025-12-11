"use client";
import { Home, ListChecks, Pencil, ShoppingCart, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import { IGenre, IUser, TRole } from "@/types";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import useCart from "@/hooks/useCart";

const DrawerItem = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
}) => (
  <Link
    href={href}
    className="flex items-center gap-4 py-3 px-4  hover:bg-[#605e71] transition duration-150 rounded-lg"
  >
    <Icon className="h-6 w-6 text-gray-300" />
    <span className="text-base font-medium">{label}</span>
  </Link>
);

export default function NavbarComponent({
  user,
  genres,
}: {
  user: IUser | null;
  genres: IGenre[];
}) {
  const { cart } = useCart();

  return (
    <div className="sticky top-0 z-50">
      {/* this navbar */}
      <nav className="bg-[#727088] shadow ">
        <div className="max-w-7xl mx-auto px-4 py-3 mb-5">
          <div className="flex items-center justify-between">
            {/* Left: Drawer Icon and Logo */}
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white cursor-pointer">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-3/4 max-w-xs bg-white p-0"
                >
                  <SheetHeader className="bg-[#727088] px-4 py-4 mb-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/"
                        className="text-lg font-bold text-white flex items-center gap-2"
                      >
                        <Home className="h-5 w-5" />
                        <span className="text-xl">হোম</span>
                      </Link>
                    </div>
                  </SheetHeader>

                  <div className="mt-2 flex flex-col gap-1 px-2 text-gray-800">
                    {/* 2. ক্যাটাগরি */}
                    <DrawerItem href="/category" label="ক্যাটাগরি" Icon={ListChecks} />

                    {/* 3. লেখকগণ */}
                    <DrawerItem href="/author" label="লেখকগণ" Icon={Pencil} />

                    {/* 4. প্রকাশক */}
                    {/* <DrawerItem href="#" label="প্রকাশক" Icon={BookOpen} /> */}

                    {/* 5. জনপ্রিয় বই সমূহ (এখানে আমি একটি বই সংক্রান্ত আইকন ব্যবহার করেছি) */}
                    {/* <DrawerItem href="#" label="জনপ্রিয় বই সমূহ" Icon={BookOpen} />  */}

                    {/* 6. আমার বই খুঁজুন */}
                    {/* <DrawerItem href="/" label="আমার বই খুঁজুন" Icon={Search} />  */}

                    {/* 7. স্টেশনারি */}
                    {/* <DrawerItem href="#" label="স্টেশনারি" Icon={Calculator} />  */}

                    {/* 8. প্রিন্ট এবং বাঁধাই */}
                    {/* <DrawerItem href="#" label="প্রিন্ট এবং বাঁধাই" Icon={Printer} />  */}

                    {/* 9. এপ্রন */}
                    {/* <DrawerItem href="#" label="এপ্রন" Icon={Shirt} />  */}

                    {/* 10. কার্ট */}
                    <DrawerItem
                      href="/cart"
                      label="কার্ট"
                      Icon={ShoppingCart}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Link
                href="/"
                className="text-xl font-bold text-white flex items-center gap-2"
              >
                <div className="relative w-10 h-10">
                  <Image src="/logo.jpg" alt="logo" fill className="rounded" />
                </div>
              </Link>
            </div>

            {/* Center: SearchInput (Desktop only) */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <SearchInput genres={genres} />
            </div>

            {/* Right: Dashboard Button and Cart Icon */}
            <div className="flex items-center gap-2">
              {user && user?.role ? (
                <Link
                  className="text-white px-3 py-2 rounded-md text-sm font-medium  hover:text-[#FF8600]"
                  href={getDefaultDashboardRoute(user.role as TRole)!}
                >
                  Dashboard
                </Link>
              ) : (
                <Button
                  asChild
                  className="bg-white text-gray-700 hover:bg-gray-200"
                >
                  <Link href="/login">লগইন</Link>
                </Button>
              )}

              <Link
                href="/cart"
                className="relative flex items-center px-3 py-2 rounded-md hover:underline"
              >
                <ShoppingCart className="h-7 w-7 text-white" />
                {cart?.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#ff8600] text-white text-xs px-1.5 rounded-full font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile: SearchInput on second line */}
          <div className="md:hidden mt-3">
            <SearchInput genres={genres} />
            <input type="text" />
          </div>
        </div>
      </nav>
    </div>
  );
}
