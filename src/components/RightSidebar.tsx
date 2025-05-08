
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import FilterTags, { FilterTagsProps } from "./FilterTags";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'filter' | 'details';
  title?: string;
  children?: React.ReactNode;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  isOpen,
  onClose,
  type = 'filter',
  title = 'Sidebar',
  children
}) => {
  // Sample data for filters
  const availableTagsData = [
    "JavaScript", "React", "CSS", "HTML", "TypeScript", 
    "Node.js", "Python", "Design", "Productivity", "Tools"
  ];
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background shadow-lg transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            {type === 'filter' && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-base font-medium">Date Range</h3>
                  <DateRangePicker 
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <h3 className="mb-3 text-base font-medium">Filter by Tags</h3>
                  <FilterTags 
                    availableTags={availableTagsData}
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                    className="w-full"
                  />
                </div>
                
                {/* Additional filter options can be added here */}
                <div>
                  <h3 className="mb-3 text-base font-medium">Additional Filters</h3>
                  {/* Status filters */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>Active Only</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>Archived</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {type === 'details' && (
              <div>
                {children || (
                  <p className="text-muted-foreground">No details available.</p>
                )}
              </div>
            )}
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={onClose}>Apply Filters</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
