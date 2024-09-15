import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <h2 className="text-3xl font-medium m-6">
        Welcome to ExhibitionCurator!
      </h2>
      <div className="m-6 space-y-3">
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
      </div>

      <div className="m-6">
        <Link to="/artwork">
          <button className="rounded-lg bg-zinc-300 p-10 m-2">
            <p>View All Artworks</p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
