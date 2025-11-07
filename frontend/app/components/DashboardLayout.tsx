"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode; 
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6">
            {children ?? (
              <div className="text-muted-foreground text-center mt-20">
                No content yet
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
