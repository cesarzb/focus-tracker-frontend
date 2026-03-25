import Sidebar from "@/components/Layout/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-stone-900 min-h-full text-slate-200">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">
        <div className="max-w-7xl mx-auto h-full">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
