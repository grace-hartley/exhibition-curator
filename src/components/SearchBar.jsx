import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchTerm }) => {
  const [userSearch, setUserSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userSearch);
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
        </div>
      </form>
    </>
  );
};

export default SearchBar;
