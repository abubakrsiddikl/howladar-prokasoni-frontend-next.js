import { Navbar } from "@/components/shared/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen ">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
