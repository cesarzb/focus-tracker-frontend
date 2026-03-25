"use client";

import Sidebar from "@/components/Layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [token, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-900 text-slate-400">
        <p className="animate-pulse">Verifying session...</p>
      </div>
    );
  }

  if (!token) {
    return null;
  }

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
