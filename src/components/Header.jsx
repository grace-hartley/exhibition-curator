import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AiOutlinePicture } from "react-icons/ai";

const Header = ({ setSearchTerm, setPage }) => {
  return (
    <header className="sticky top-0 flex justify-between items-center border-b border-gray-300 px-5 py-3 bg-white flex-col md:flex-row w-full z-50">
      <div className="w-full md:w-auto md:flex-1 flex justify-start py-4">
        <Link to="/">
          <h1 className="text-4xl md:text-5xl text-zinc-500 font-medium">
            ExhibitionCurator
          </h1>
        </Link>
      </div>
      <div className="items-center flex flex-row justify-end">
        <SearchBar setSearchTerm={setSearchTerm} setPage={setPage} />

        <Link to="/user">
          <button
            className="hover:bg-orange-600 transition rounded-lg px-2 py-1 ml-3"
            aria-label="Curated Art"
          >
            <AiOutlinePicture size={40} />
          </button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
