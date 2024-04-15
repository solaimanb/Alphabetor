import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[60px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex flex-col w-56 fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <main className="md:ml-56 mt-[60px] p-2 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
