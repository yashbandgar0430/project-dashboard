import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
export default function AppLayout({ children, isAdmin, darkMode, setDarkMode }: any) {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">

      {/* SIDEBAR */}
      <Sidebar isAdmin={isAdmin} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar isAdmin={isAdmin} />

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6 animate-fade-in">
          {children}
        </div>

      </div>

    </div>
  );
}