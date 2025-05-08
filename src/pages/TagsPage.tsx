
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
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
import { Edit, File, MoreHorizontal, Tag as TagIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import TagManager from "@/components/TagManager";

// Sample data for demonstration
const availableTagsData = [
  "JavaScript", "React", "CSS", "HTML", "TypeScript", 
  "Node.js", "Python", "Design", "Productivity", "Tools",
  "API", "Backend", "Frontend", "Mobile", "Web", "UI/UX",
  "Database", "Performance", "Security", "DevOps"
];

const tagsData = [
  { 
    id: 1, 
    name: "JavaScript", 
    color: "blue",
    count: 245, 
    engagement: 87, 
    growth: "+12%", 
    type: "personal", 
    visibility: "private", 
    createdBy: "John Doe", 
    createdAt: "2023-04-15" 
  },
  { 
    id: 2, 
    name: "React", 
    color: "purple",
    count: 198, 
    engagement: 75, 
    growth: "+9%", 
    type: "team", 
    visibility: "shared", 
    createdBy: "Jane Smith", 
    createdAt: "2023-04-18" 
  },
  { 
    id: 3, 
    name: "TypeScript", 
    color: "blue",
    count: 176, 
    engagement: 63, 
    growth: "+23%", 
    type: "global", 
    visibility: "public", 
    createdBy: "Admin", 
    createdAt: "2023-05-01" 
  },
  { 
    id: 4, 
    name: "CSS", 
    color: "green",
    count: 154, 
    engagement: 52, 
    growth: "+4%", 
    type: "personal", 
    visibility: "private", 
    createdBy: "John Doe", 
    createdAt: "2023-05-05" 
  },
  { 
    id: 5, 
    name: "HTML", 
    color: "orange",
    count: 142, 
    engagement: 49, 
    growth: "+2%", 
    type: "team", 
    visibility: "shared", 
    createdBy: "Team Lead", 
    createdAt: "2023-05-10" 
  },
  { 
    id: 6, 
    name: "Node.js", 
    color: "green",
    count: 138, 
    engagement: 48, 
    growth: "+7%", 
    type: "global", 
    visibility: "public", 
    createdBy: "Admin", 
    createdAt: "2023-05-15" 
  },
  { 
    id: 7, 
    name: "Python", 
    color: "yellow",
    count: 123, 
    engagement: 43, 
    growth: "+15%", 
    type: "personal", 
    visibility: "private", 
    createdBy: "John Doe", 
    createdAt: "2023-05-20" 
  },
  { 
    id: 8, 
    name: "Design", 
    color: "purple",
    count: 112, 
    engagement: 39, 
    growth: "+5%", 
    type: "team", 
    visibility: "shared", 
    createdBy: "Design Team", 
    createdAt: "2023-05-25" 
  },
  { 
    id: 9, 
    name: "Productivity", 
    color: "gray",
    count: 98, 
    engagement: 34, 
    growth: "+8%", 
    type: "global", 
    visibility: "public", 
    createdBy: "Admin", 
    createdAt: "2023-06-01" 
  },
  { 
    id: 10, 
    name: "Tools", 
    color: "gray",
    count: 87, 
    engagement: 30, 
    growth: "+6%", 
    type: "personal", 
    visibility: "private", 
    createdBy: "John Doe", 
    createdAt: "2023-06-05" 
  },
];

const TagsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>(null);
  
  const handleEditTag = (tag: any) => {
    setSelectedTag(tag);
    setIsTagManagerOpen(true);
  };
  
  return (
    <div className="space-y-6">
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
                  <TableHead className="w-[60px]">ID</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Engagement</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                  <TableHead className="text-right">Created By</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tagsData.map((tag) => (
                  <TableRow key={tag.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{tag.id}</TableCell>
                    <TableCell>
                      <span className={cn("tag", `tag-${tag.color}`)}>
                        {tag.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tag.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tag.visibility}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{tag.count}</TableCell>
                    <TableCell className="text-right">{tag.engagement}</TableCell>
                    <TableCell className="text-right text-emerald-500">{tag.growth}</TableCell>
                    <TableCell className="text-right">{tag.createdBy}</TableCell>
                    <TableCell className="text-right">{tag.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTag(tag)}>
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <File size={14} className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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

      {selectedTag && (
        <TagManager
          isOpen={isTagManagerOpen}
          onClose={() => {
            setIsTagManagerOpen(false);
            setSelectedTag(null);
          }}
          editMode={true}
          tagData={{
            name: selectedTag.name,
            description: "",
            color: selectedTag.color,
            type: selectedTag.type,
            visibility: selectedTag.visibility
          }}
        />
      )}
    </div>
  );
};

export default TagsPage;
