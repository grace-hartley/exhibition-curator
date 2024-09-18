import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setSearchTerm, setPage }) => {
  const [userSearch, setUserSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userSearch);
    setPage(1);
    navigate("/search");
    setUserSearch("");
  };
  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <input
            type="text"
            className="bg-zinc-300 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Search artwork..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
