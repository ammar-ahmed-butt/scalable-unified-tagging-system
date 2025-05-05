import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";

interface SearchTagsProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchTags = ({ onSearch, placeholder = "Search tags...", className }: SearchTagsProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={16} className="text-muted-foreground" />
      </div>
      <input
        type="text"
        className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input bg-background"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchTags;
