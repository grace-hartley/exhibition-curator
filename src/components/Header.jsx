import { Link } from "react-router-dom";
import UserArt from "./UsersArt";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>ExhibitionCurator</h1>
      </Link>
      <Link to="/user" style={{ textDecoration: "none" }}>
        <button className="user-artwork-button">
          <p>Curated Artwork</p>
        </button>
      </Link>
    </header>
  );
};
export default Header;
