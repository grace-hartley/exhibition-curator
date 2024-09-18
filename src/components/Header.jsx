import { Link } from "react-router-dom";
import UserArt from "./CuratedArt";
import SearchBar from "./SearchBar";
import { AiOutlinePicture } from "react-icons/ai";

const Header = ({ setSearchTerm, setPage }) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-300 px-4 py-6 bg-white">
      <Link to="/" className="text-decoration-none">
        <h1 className="text-3xl md:text-5xl text-zinc-500 font-medium">
          ExhibitionCurator
        </h1>
      </Link>

      <SearchBar setSearchTerm={setSearchTerm} setPage={setPage} />

      <Link to="/user" className="text-decoration-none">
        <button className="flex items-center justify-end hover:bg-zinc-400 transition rounded-lg px-3 py-2 text-sm md:text-base">
          <AiOutlinePicture size={30} />
        </button>
      </Link>
    </header>
  );
};
export default Header;
