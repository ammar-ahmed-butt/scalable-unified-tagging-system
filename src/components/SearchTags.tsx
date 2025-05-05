
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchTagsProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchTags: React.FC<SearchTagsProps> = ({ 
  onSearch,
  placeholder = "Search..."
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearch}
        className="pl-10 w-full bg-background border-border"
      />
    </div>
  );
};

export default SearchTags;
