
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Menu, 
  Calendar, 
  BarChart2, 
  Tag, 
  X, 
  Settings, 
  Users, 
  Filter,
  FileText,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  onNavItemClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { colorScheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNavItemClick = () => {
    if (onNavItemClick && isMobile) {
      onNavItemClick();
    }
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/tags", label: "Tags", icon: Tag },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/jobs", label: "Job Portal", icon: Briefcase },
    { path: "/users", label: "User Management", icon: Users },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const secondaryItems = [
    { path: "/filters", label: "Saved Filters", icon: Filter },
    { path: "/reports", label: "Reports", icon: FileText },
  ];

  return (
    <div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col z-40 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <div className="text-primary size-8 flex items-center justify-center border-2 border-primary rounded">
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="ml-2 font-bold text-lg">Tag Tapestry</div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
        <nav>
          <TooltipProvider delayDuration={200}>
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center p-2 rounded-md transition-colors",
                          location.pathname === item.path
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                          collapsed ? "justify-center" : "justify-start"
                        )}
                        onClick={handleNavItemClick}
                      >
                        <item.icon size={20} />
                        {!collapsed && <span className="ml-3">{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>

          {!collapsed && <div className="px-3 py-3 text-xs font-semibold text-sidebar-foreground/70 uppercase mt-6">Tools</div>}
          
          <TooltipProvider delayDuration={200}>
            <ul className="space-y-1 px-2">
              {secondaryItems.map((item) => (
                <li key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center p-2 rounded-md transition-colors",
                          location.pathname === item.path
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                          collapsed ? "justify-center" : "justify-start"
                        )}
                        onClick={handleNavItemClick}
                      >
                        <item.icon size={20} />
                        {!collapsed && <span className="ml-3">{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>

        <div className="mt-auto px-2">
          <TooltipProvider delayDuration={200}>
            <div className="border-t border-sidebar-border pt-4 px-2">
              <div className={cn(
                "flex items-center cursor-pointer",
                collapsed ? "justify-center" : "justify-start"
              )}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary",
                      collapsed ? "mx-auto" : ""
                    )}>
                      <span className="text-sm font-medium">AA</span>
                    </div>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      Ammar Ahmed Butt
                    </TooltipContent>
                  )}
                </Tooltip>
                {!collapsed && <span className="ml-3 text-sm font-medium">Ammar Ahmed Butt</span>}
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
