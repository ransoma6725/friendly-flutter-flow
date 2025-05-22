
import React from "react";
import { Input } from "@/components/ui/input";

interface SearchRoutesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchRoutes = ({ searchTerm, setSearchTerm }: SearchRoutesProps) => {
  return (
    <div className="p-4">
      <Input 
        placeholder="Search routes..." 
        className="max-w-sm" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchRoutes;
