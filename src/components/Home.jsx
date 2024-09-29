import Gallery from "./Gallery";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const Home = () => {
  return (
    <>
      <h2 className="text-3xl font-medium m-6 text-center">
        Welcome to ExhibitionCurator!
      </h2>
      <div className="m-6 space-y-3">
        <p className="italic text-lg text-gray-600 border-l-4 border-gray-400 pl-4">
          “Art is not what you see, but what you make others see.” – Edgar
          Degas, French Impressionist (1834-1917)
        </p>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            ExhibitionCurator allows you to explore more about a wide range of
            art and curate your own personal art collection. This is your place
            to let your personanality shine!
          </p>
          <p>
            To get started, browze the gallery below or use the search bar to
            start exporing, where you can futher refine your search. If you want
            to find out more about a piece of art, simply click on the
            corresponding image. When you find a piece of at that is calling
            your name, add it to your collection by pressing the{" "}
            <span className="inline-flex items-center">
              <FiPlusCircle className="mr-1" aria-label="Add" /> button
            </span>
            , or the{" "}
            <span className="inline-flex items-center">
              <FiMinusCircle className="mr-1" aria-label="Remove" /> button
            </span>{" "}
            if you change your mind.
          </p>
          <p>
            But be careful! When you close the browzer your collection goes with
            it - it is there to be enjoyed for a short time, not a long time!
          </p>
        </div>
      </div>

      <div className="m-6">
        <Gallery />
      </div>
    </>
  );
};

export default Home;
