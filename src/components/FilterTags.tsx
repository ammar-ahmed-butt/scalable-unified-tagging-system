
import React, { useState } from "react";
import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RightSidebar from "./RightSidebar";
import TagManager from "./TagManager";

export interface FilterTagsProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string; // Added className as an optional prop
}

const FilterTags: React.FC<FilterTagsProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
  className,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };
  
  return (
    <div className={`flex flex-wrap gap-2 items-center ${className || ''}`}>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setIsFilterOpen(true)}
      >
        <Filter size={16} />
        <span>Filter</span>
        {selectedTags.length > 0 && (
          <Badge variant="secondary" className="ml-1">
            {selectedTags.length}
          </Badge>
        )}
      </Button>
      
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setIsTagManagerOpen(true)}
      >
        <Plus size={16} />
        <span>Create Tag</span>
      </Button>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 max-w-md overflow-hidden">
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
      )}
      
      <RightSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        type="filter"
        title="Filters"
      />
      
      <TagManager
        isOpen={isTagManagerOpen}
        onClose={() => setIsTagManagerOpen(false)}
      />
    </div>
  );
};

export default FilterTags;
