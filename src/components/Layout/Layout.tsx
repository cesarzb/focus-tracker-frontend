import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex bg-stone-900 min-h-full text-slate-200">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
