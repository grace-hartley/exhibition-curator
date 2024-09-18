import { Link } from "react-router-dom";

const ArtworkList = ({ artworks }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none">
      {artworks.map((artwork) => (
        <Link to={`/artwork/${artwork.id}`} key={artwork.id}>
          <li
            key={artwork.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={artwork.imageUrlSmall}
              alt={artwork.title}
              className="w-full h-auto mb-4 rounded"
            />
            <div className="text-center">
              <p className="text-lg font-semibold">{artwork.title}</p>
              <p className="text-sm text-gray-500">
                {artwork.year} {artwork.id}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ArtworkList;
