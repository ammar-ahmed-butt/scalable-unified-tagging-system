
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import SearchTags from "@/components/SearchTags";
import { DateRangePicker } from "@/components/DateRangePicker";
import FilterTags from "@/components/FilterTags";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample data for demonstration
const availableTagsData = [
  "JavaScript", "React", "CSS", "HTML", "TypeScript", 
  "Node.js", "Python", "Design", "Productivity", "Tools",
  "API", "Backend", "Frontend", "Mobile", "Web", "UI/UX",
  "Database", "Performance", "Security", "DevOps"
];

const tagsData = [
  { id: 1, name: "JavaScript", count: 245, engagement: 87, growth: "+12%" },
  { id: 2, name: "React", count: 198, engagement: 75, growth: "+9%" },
  { id: 3, name: "TypeScript", count: 176, engagement: 63, growth: "+23%" },
  { id: 4, name: "CSS", count: 154, engagement: 52, growth: "+4%" },
  { id: 5, name: "HTML", count: 142, engagement: 49, growth: "+2%" },
  { id: 6, name: "Node.js", count: 138, engagement: 48, growth: "+7%" },
  { id: 7, name: "Python", count: 123, engagement: 43, growth: "+15%" },
  { id: 8, name: "Design", count: 112, engagement: 39, growth: "+5%" },
  { id: 9, name: "Productivity", count: 98, engagement: 34, growth: "+8%" },
  { id: 10, name: "Tools", count: 87, engagement: 30, growth: "+6%" },
];

const TagsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
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
        <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
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
      
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Tag Name</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Engagement</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tagsData.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-medium">{tag.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {tag.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{tag.count}</TableCell>
                    <TableCell className="text-right">{tag.engagement}</TableCell>
                    <TableCell className="text-right text-green-500">{tag.growth}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TagsPage;
