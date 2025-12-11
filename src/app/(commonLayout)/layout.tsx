import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen space-y-6 bg-[#eeeeee]">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
