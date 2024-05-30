import MainNav from "@/components/main-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:flex sm:flex-col">
      <MainNav />
      <div className="md:pl-16 w-full flex flex-col">{children}</div>
    </div>
  );
}
