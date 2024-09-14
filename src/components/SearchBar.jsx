import { useState } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [userSearch, setUserSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userSearch);
    setUserSearch("");
  };
  return (
    <>
      <form class="max-w-md mx-auto">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <input
            type="text"
            id="simple-search"
            class="bg-zinc-300 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Search artwork..."
            required
          />
        </div>
      </form>
    </>
  );
};

export default SearchBar;
