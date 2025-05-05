
import React, { useState } from "react";
import { X, Check, RefreshCw, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  type: "filter" | "create" | "edit";
  title?: string;
}

const statusOptions = [
  { label: "Prospect", value: "prospect", color: "status-prospect" },
  { label: "Cold", value: "cold", color: "status-cold" },
  { label: "Warm", value: "warm", color: "status-warm" },
  { label: "Hot", value: "hot", color: "status-hot" },
  { label: "Rejected", value: "rejected", color: "status-rejected" },
  { label: "Hired", value: "hired", color: "status-hired" },
  { label: "Closed", value: "closed", color: "status-closed" },
];

const tagOptions = [
  { label: "JavaScript", value: "javascript", color: "tag-blue" },
  { label: "React", value: "react", color: "tag-purple" },
  { label: "TypeScript", value: "typescript", color: "tag-blue" },
  { label: "CSS", value: "css", color: "tag-green" },
  { label: "HTML", value: "html", color: "tag-orange" },
  { label: "Node.js", value: "nodejs", color: "tag-green" },
  { label: "Python", value: "python", color: "tag-yellow" },
  { label: "Design", value: "design", color: "tag-purple" },
  { label: "Productivity", value: "productivity", color: "tag-gray" },
  { label: "Tools", value: "tools", color: "tag-gray" },
];

const companyOptions = [
  { label: "Acme Inc", value: "acme" },
  { label: "TechCorp", value: "techcorp" },
  { label: "DevSolutions", value: "devsolutions" },
  { label: "WebStudio", value: "webstudio" },
  { label: "CodeMasters", value: "codemasters" },
];

const roleOptions = [
  { label: "Frontend Developer", value: "frontend" },
  { label: "Backend Developer", value: "backend" },
  { label: "Full Stack Developer", value: "fullstack" },
  { label: "UI/UX Designer", value: "design" },
  { label: "Product Manager", value: "product" },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  isOpen, 
  onClose, 
  type = "filter",
  title = "Filters"
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company) 
        : [...prev, company]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role]
    );
  };

  const resetFilters = () => {
    setDateRange({
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date()
    });
    setSelectedStatuses([]);
    setSelectedTags([]);
    setSelectedCompanies([]);
    setSelectedRoles([]);
    setIncludeArchived(false);
    setSearchQuery("");
  };

  const applyFilters = () => {
    // Here we would apply the filters to the data
    console.log("Applying filters:", {
      dateRange,
      selectedStatuses,
      selectedTags,
      selectedCompanies,
      selectedRoles,
      includeArchived,
      searchQuery
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-medium">{title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name, tag, etc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Date Range */}
              <div>
                <Label>Date Range</Label>
                <div className="mt-1">
                  <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <Label>Status</Label>
                <div className="mt-2 space-y-2">
                  {statusOptions.map((status) => (
                    <div key={status.value} className="flex items-center">
                      <Checkbox
                        id={`status-${status.value}`}
                        checked={selectedStatuses.includes(status.value)}
                        onCheckedChange={() => toggleStatus(status.value)}
                      />
                      <label
                        htmlFor={`status-${status.value}`}
                        className="ml-2 flex items-center cursor-pointer"
                      >
                        <span className={cn("status-badge", status.color)}>
                          {status.label}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div>
                <Label>Tags</Label>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <Badge
                        key={tag.value}
                        variant={selectedTags.includes(tag.value) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer select-none",
                          selectedTags.includes(tag.value) ? "bg-primary" : ""
                        )}
                        onClick={() => toggleTag(tag.value)}
                      >
                        {tag.label}
                        {selectedTags.includes(tag.value) && (
                          <Check className="ml-1" size={14} />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Company Filter */}
              <div>
                <Label>Company</Label>
                <div className="mt-2 space-y-2">
                  {companyOptions.map((company) => (
                    <div key={company.value} className="flex items-center">
                      <Checkbox
                        id={`company-${company.value}`}
                        checked={selectedCompanies.includes(company.value)}
                        onCheckedChange={() => toggleCompany(company.value)}
                      />
                      <label
                        htmlFor={`company-${company.value}`}
                        className="ml-2 cursor-pointer"
                      >
                        {company.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Role Filter */}
              <div>
                <Label>Role</Label>
                <div className="mt-2 space-y-2">
                  {roleOptions.map((role) => (
                    <div key={role.value} className="flex items-center">
                      <Checkbox
                        id={`role-${role.value}`}
                        checked={selectedRoles.includes(role.value)}
                        onCheckedChange={() => toggleRole(role.value)}
                      />
                      <label
                        htmlFor={`role-${role.value}`}
                        className="ml-2 cursor-pointer"
                      >
                        {role.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Include Archived */}
              <div className="flex items-center justify-between">
                <Label htmlFor="include-archived">Include Archived</Label>
                <Switch
                  id="include-archived"
                  checked={includeArchived}
                  onCheckedChange={setIncludeArchived}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t p-4">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex items-center"
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
