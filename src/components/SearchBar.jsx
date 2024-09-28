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
      <form className="max-w-md mx-auto w-full" onSubmit={handleSubmit}>
        <div className="relative w-60 ">
          {" "}
          {/* div holds search button in correct place*/}
          <input
            type="text"
            className="w-full bg-zinc-300 text-gray-900 text-sm rounded-full focus:border-orange-600 block p-2.5"
            placeholder="Search artwork..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-orange-600"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
