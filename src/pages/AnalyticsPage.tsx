
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import SearchTags from "@/components/SearchTags";
import { DateRangePicker } from "@/components/DateRangePicker";
import FilterTags from "@/components/FilterTags";
import InteractiveChart from "@/components/InteractiveChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      clicks: Math.floor(Math.random() * 60) + 10,
      impressions: Math.floor(Math.random() * 120) + 80,
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

const AnalyticsPage = () => {
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
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
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
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128.4k</div>
                <p className="text-xs text-muted-foreground">
                  +14.2% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 42s</div>
                <p className="text-xs text-muted-foreground">
                  +18.2% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34.8%</div>
                <p className="text-xs text-muted-foreground">
                  -2.3% from last period
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <InteractiveChart 
              title="Performance Overview"
              data={filteredData}
              type="area"
              color="#8B5CF6"
              additionalDataKeys={["engagement"]}
            />
            <InteractiveChart 
              title="User Interactions"
              data={filteredData}
              type="line"
              color="#0EA5E9"
              additionalDataKeys={["clicks", "impressions"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Likes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48.2k</div>
                <p className="text-xs text-muted-foreground">
                  +8.1% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.7k</div>
                <p className="text-xs text-muted-foreground">
                  +14.3% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.3k</div>
                <p className="text-xs text-muted-foreground">
                  +22.8% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.5k</div>
                <p className="text-xs text-muted-foreground">
                  +12.4% from last period
                </p>
              </CardContent>
            </Card>
          </div>
          
          <InteractiveChart 
            title="Engagement Metrics Over Time"
            data={filteredData}
            type="line"
            color="#F97316"
            additionalDataKeys={["clicks", "engagement"]}
          />
        </TabsContent>
        
        <TabsContent value="growth" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <InteractiveChart 
              title="Tag Growth"
              data={filteredData}
              type="bar"
              color="#10B981"
            />
            <Card>
              <CardHeader>
                <CardTitle>Growth Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">New Tags</p>
                      <p className="text-2xl font-bold">+147</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Retention</p>
                      <p className="text-2xl font-bold">87.2%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">User Growth</p>
                      <p className="text-2xl font-bold">+12.4%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Active Daily</p>
                      <p className="text-2xl font-bold">24.8k</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
