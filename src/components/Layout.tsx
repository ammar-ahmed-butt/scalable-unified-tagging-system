
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import RightSidebar from "./RightSidebar";
import TagManager from "./TagManager";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 md:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="absolute inset-0 z-[-1]"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={cn(
            "h-full transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-xl">Tag Tapestry</h1>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsTagManagerOpen(true)}>
                <Plus size={18} />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsFilterOpen(true)}>
                <Bell size={18} />
              </Button>
              <Button
                variant="default"
                className="hidden md:flex"
                onClick={() => setIsTagManagerOpen(true)}
              >
                Create Tag
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
        
        <RightSidebar 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
          type="filter"
          title="Filters"
        />
        
        <TagManager
          isOpen={isTagManagerOpen}
          onClose={() => setIsTagManagerOpen(false)}
        />
      </div>
    </div>
  );
};

export default Layout;
