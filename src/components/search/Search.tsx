"use client";

import { SearchIcon } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SearchProps {
  text: string;
}

const Search: React.FC<SearchProps> = ({ text }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize the search term from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialSearch = params.get("search") || "";
    setSearchTerm(initialSearch);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateURLParams(searchTerm);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleInputClear = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      updateURLParams('');
    }
  };

  const updateURLParams = (term: string) => {
    // Extract the language segment from the pathname
    const pathSegments = pathname.split("/");
    const langSegment = pathSegments[1];

    // Create a new URLSearchParams object from the current URL's search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Set the new search term or clear it if empty
    if (term.trim() !== "") {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // Construct the new URL with the language segment and combined query parameters
    const newUrl = `/${langSegment}/shop?${params.toString()}`;
    router.replace(newUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-xl relative flex">
        <span className="absolute left-4 top-3 text-lg text-gray-400">
          <SearchIcon />
        </span>

        <input
          type="search"
          name="search"
          id="search"
          className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
          placeholder={text}
          value={searchTerm}
          onChange={handleInputChange}
          onInput={handleInputClear}
        />

        <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
          {text}
        </button>
      </div>
    </form>
  );
};

export default Search;
