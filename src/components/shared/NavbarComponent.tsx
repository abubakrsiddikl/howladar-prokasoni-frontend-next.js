"use client";
import { Menu, ShoppingCart } from "lucide-react";
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
import { IUser, TRole } from "@/types";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";

export default function NavbarComponent({ user }: { user: IUser | null }) {
  //  NavLink Generator
  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-[#FF8600]"
    >
      {label}
    </Link>
  );

  return (
    <div>
      <div className="sticky top-0 z-50">
        {/* this navbar */}
        <nav className="bg-[#727088] shadow ">
          <div className="max-w-7xl mx-auto px-4 py-3 mb-5">
            <div className="flex items-center justify-between">
              {/* Left: Drawer Icon and Logo */}
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-3/4 bg-[#727088]">
                    <SheetHeader>
                      <Link
                        href="/"
                        className="text-lg font-bold text-white flex items-center gap-2"
                      >
                        <Image
                          src="/logo.jpg"
                          fill
                          className="max-h-6 dark:invert"
                          alt="logo"
                        />
                      </Link>
                    </SheetHeader>

                    <div className="mt-6 flex flex-col gap-2">
                      {navLink("/", "হোম")}
                      {navLink("#", "ক্যাটাগরি")}
                      {navLink("#", " লেখকগণ")}
                      {navLink("#", " প্রকাশক")}
                      {navLink("/order-track", " অর্ডার ট্র্যাক করুন")}
                    </div>
                  </SheetContent>
                </Sheet>
                <Link
                  href="/"
                  className="text-xl font-bold text-white flex items-center gap-2"
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src="/logo.jpg"
                      alt="logo"
                      fill
                      className="rounded"
                    />
                  </div>
                </Link>
              </div>

              {/* Center: SearchInput (Desktop only) */}
              <div className="hidden md:flex flex-1 justify-center px-4">
                <SearchInput />
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
                  {/* {cart?.length > 0 && (
                    <span className="absolute top-1 right-1 bg-[#ff8600] text-white text-xs px-1.5 rounded-full font-bold">
                      {cart.length}
                    </span>
                  )} */}
                </Link>
              </div>
            </div>

            {/* Mobile: SearchInput on second line */}
            <div className="md:hidden mt-3">
              {/* <SearchInput /> */}
              <input type="text" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
