"use client";

import { AuthProvider } from "@/core/context/auth-context";
import Sidebar from "@/core/components/Sidebar";
import TopBar from "@/core/components/TopBar";
import BottomNav from "@/core/components/BottomNav";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-neo-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </AuthProvider>
  );
}
