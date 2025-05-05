
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TagsPage from "./pages/TagsPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";

// Create placeholder pages for new routes
const JobPortalPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Job Portal</h1><p className="mt-4 text-muted-foreground">Job Portal functionality coming soon.</p></div>;
const UserManagementPage = () => <div className="p-4"><h1 className="text-2xl font-bold">User Management</h1><p className="mt-4 text-muted-foreground">User Management functionality coming soon.</p></div>;
const SavedFiltersPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Saved Filters</h1><p className="mt-4 text-muted-foreground">Saved Filters functionality coming soon.</p></div>;
const ReportsPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Reports</h1><p className="mt-4 text-muted-foreground">Reports functionality coming soon.</p></div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/jobs" element={<JobPortalPage />} />
              <Route path="/users" element={<UserManagementPage />} />
              <Route path="/filters" element={<SavedFiltersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
