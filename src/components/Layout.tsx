
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, Filter, Bell, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import RightSidebar from "./RightSidebar";
import TagManager from "./TagManager";
import SearchTags from "./SearchTags";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);
  const location = useLocation();

  // Function to get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/") return "Dashboard";
    if (path === "/tags") return "Tags";
    if (path === "/calendar") return "Calendar";
    if (path === "/jobs") return "Job Portal";
    if (path === "/users") return "User Management";
    if (path === "/settings") return "Settings";
    if (path === "/filters") return "Saved Filters";
    if (path === "/reports") return "Reports";
    
    return "Tag Tapestry";
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Function to handle search
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search functionality here
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block h-screen sticky top-0">
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
            "h-full w-3/4 max-w-sm transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar onNavItemClick={closeSidebar} />
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
          
          {/* Page Title - Moved from main content to header */}
          <div className="flex-1 flex items-center gap-2">
            <h1 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h1>
          </div>
          
          {/* Search bar - Moved from page content to header */}
          <div className="hidden sm:flex flex-1 max-w-md">
            <SearchTags onSearch={handleSearch} placeholder={`Search ${getPageTitle().toLowerCase()}...`} />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filter button - Moved to header */}
            <Button variant="outline" size="icon" onClick={() => setIsFilterOpen(true)}>
              <Filter size={18} />
            </Button>
            
            {/* Create Tag button - Only in top navigation */}
            <Button
              variant="default"
              onClick={() => setIsTagManagerOpen(true)}
              className="hidden md:flex"
            >
              Create Tag
            </Button>
            
            {/* Notification button - Moved to far right */}
            <Button variant="outline" size="icon">
              <Bell size={18} />
            </Button>
          </div>
        </header>
        
        {/* Mobile search - Only shown on small screens */}
        <div className="sm:hidden p-2 border-b">
          <SearchTags onSearch={handleSearch} placeholder={`Search ${getPageTitle().toLowerCase()}...`} />
        </div>
        
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
