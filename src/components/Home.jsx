import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="home">
        <h2>Welcome to ExhibitionCurator!</h2>
        <p>
          “Art is not what you see, but what you make others see.” – Edgar Degas
        </p>
        <p>
          Explore more about a wide range of art and curate your personal
          collection of art. This is your place to let your personanality shine.
        </p>
        <p>
          To get started, click on the gallery below that you would like to
          start exporing. When you find a piece of at that is calling your name,
          add it to your collection by pressing the + button, but be careful!
          When you close the browzer your collection goes with it - it is there
          to be enjoyed for a short time, not a long time!
        </p>

        <Link to="/artwork">
          <button className="view-met-button">
            <p>View Metropolitan Museum Artworks</p>
          </button>
        </Link>
        <button className="view-chicago-button">
          <p>View Art Institute of Chicago Artworks</p>
        </button>
      </div>
    </>
  );
};

export default Home;
