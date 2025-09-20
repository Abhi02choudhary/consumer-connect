import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative flex items-center w-77 h-9 border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-white hover:bg-gray-100 transition-colors">
      {/* Search Icon */}
      <Search className="w-5 h-5 text-gray-500 mr-2" />

      {/* Input Field */}
      <Input
        type="text"
        placeholder="Search"
        className="flex-1 border-none focus:ring-0 text-gray-700 bg-transparent placeholder-gray-500"
      />
       <kbd className="ml-2 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded">
        ⌘ K
      </kbd>
    </div>
  );
}