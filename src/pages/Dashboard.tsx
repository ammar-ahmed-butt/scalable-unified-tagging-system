
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import SearchTags from "@/components/SearchTags";
import { DateRangePicker } from "@/components/DateRangePicker";
import FilterTags from "@/components/FilterTags";
import InteractiveChart from "@/components/InteractiveChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample data for demonstration
const generateChartData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 100) + 50,
      engagement: Math.floor(Math.random() * 80) + 20,
      dateObj: date
    });
  }
  
  return data;
};

const availableTagsData = [
  "JavaScript", "React", "CSS", "HTML", "TypeScript", 
  "Node.js", "Python", "Design", "Productivity", "Tools",
  "API", "Backend", "Frontend", "Mobile", "Web", "UI/UX",
  "Database", "Performance", "Security", "DevOps"
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [chartData, setChartData] = useState(generateChartData(30));
  
  // Filter data based on date range
  const filteredData = chartData.filter(item => {
    if (!dateRange?.from || !dateRange?.to) return true;
    return item.dateObj >= dateRange.from && item.dateObj <= dateRange.to;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would filter data based on the search query
  };
  
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <SearchTags onSearch={handleSearch} />
          <div className="flex flex-wrap gap-3">
            <FilterTags 
              availableTags={availableTagsData}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">863</div>
            <p className="text-xs text-muted-foreground">
              +4.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8k</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">
              +10.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <InteractiveChart 
          title="Tag Engagement Over Time"
          data={filteredData}
          type="area"
          color="#8B5CF6"
          additionalDataKeys={["engagement"]}
        />
        <InteractiveChart 
          title="Tag Distribution"
          data={filteredData}
          type="bar"
          color="#F97316"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { tag: "JavaScript", value: 87, change: "+12%" },
                { tag: "React", value: 75, change: "+9%" },
                { tag: "TypeScript", value: 63, change: "+23%" },
                { tag: "CSS", value: 52, change: "+4%" },
                { tag: "Node.js", value: 48, change: "+7%" },
              ].map((item, index) => (
                <div className="flex items-center" key={index}>
                  <div className="mr-4 font-medium">{index + 1}.</div>
                  <div className="flex-1">
                    <div className="font-medium">{item.tag}</div>
                    <div className="text-sm text-muted-foreground">
                      Engagement score
                    </div>
                  </div>
                  <div className="font-medium text-right">{item.value}</div>
                  <div className="ml-2 text-sm text-green-500">
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "NextJS", "TailwindCSS", "Shadcn", "Astro", "Supabase", 
                "Docker", "Kubernetes"
              ].map((tag, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full">
                    {tag.charAt(0)}
                  </Badge>
                  <div>
                    <div className="font-medium">{tag}</div>
                    <div className="text-sm text-muted-foreground">
                      Added {i + 1} day{i !== 0 ? 's' : ''} ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
