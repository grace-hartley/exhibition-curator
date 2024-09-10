import { Link } from "react-router-dom";
import UserArt from "./CuratedArt";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="text-5xl p-8 text-zinc-500 font-medium">
          ExhibitionCurator
        </h1>
      </Link>
      <Link to="/user" style={{ textDecoration: "none" }}>
        <button className="mr-10 flex jutify-end bg-zinc-300 rounded-lg p-2">
          <p>Curated Artwork</p>
        </button>
      </Link>
    </header>
  );
};
export default Header;
