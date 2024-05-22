"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      return;
    }

    // Extract the language segment from the pathname
    const pathSegments = pathname.split("/");
    const langSegment = pathSegments[1];

    // Create a new URLSearchParams object from the current URL's search parameters
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    // Set the new search term
    params.set("search", searchTerm);

    // Construct the new URL with the language segment and combined query parameters
    const newUrl = `/${langSegment}/shop?${params.toString()}`;
    router.replace(newUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <SearchIcon />
          </span>

          <input
            type="text"
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
