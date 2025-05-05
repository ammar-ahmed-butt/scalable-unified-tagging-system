
import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterTagsProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    // Auto-adjust the popover width based on content
    if (popoverContentRef.current && isOpen) {
      const contentWidth = Math.min(
        400,
        Math.max(200, popoverContentRef.current.scrollWidth + 32)
      );
      popoverContentRef.current.style.width = `${contentWidth}px`;
    }
  }, [isOpen, availableTags]);

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            <span>Filter Tags</span>
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedTags.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={popoverContentRef}
          className="w-auto p-4"
          align="start"
        >
          <div className="space-y-4">
            <h4 className="font-medium">Select Tags</h4>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-2">
                {availableTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="text-sm cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {selectedTags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Selected Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <span className="ml-1 text-xs">×</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterTags;
