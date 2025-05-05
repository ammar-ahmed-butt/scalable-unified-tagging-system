
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FilterTags from "./FilterTags";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  type: "filter" | "details";
  title: string;
}

const RightSidebar = ({ isOpen, onClose, type, title }: RightSidebarProps) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });

  // Sample data for demonstration
  const availableTagsData = [
    "JavaScript", "React", "CSS", "HTML", "TypeScript", 
    "Node.js", "Python", "Design", "Productivity", "Tools",
    "API", "Backend", "Frontend", "Mobile", "Web", "UI/UX",
    "Database", "Performance", "Security", "DevOps"
  ];

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-background shadow-lg border-l transition-transform duration-300 transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {type === "filter" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-md font-medium">Date Range</h3>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={handleDateRangeChange}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">Tags</h3>
                <FilterTags
                  availableTags={availableTagsData}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">Active</Button>
                  <Button variant="outline" className="justify-start">Archived</Button>
                  <Button variant="outline" className="justify-start">Shared</Button>
                  <Button variant="outline" className="justify-start">Private</Button>
                </div>
              </div>
            </div>
          )}
          
          {type === "details" && (
            <div className="space-y-4">
              <p>Details content goes here.</p>
            </div>
          )}
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
