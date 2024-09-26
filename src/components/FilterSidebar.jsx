import { useState } from "react";

const FilterBar = ({ filters, setFilters }) => {
  // Local state for form inputs
  const [localFilters, setLocalFilters] = useState({
    source: filters.source || "",
    artworkType: filters.artworkType || "",
    yearBegin: filters.yearBegin || "",
    yearEnd: filters.yearEnd || "",
    isHighlight: filters.isHighlight || false,
  });

  // Handle changes to local state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // Apply filters when Submit is clicked
  const applyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <div className="filter-bar p-3 bg-gray-100 rounded flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      {/* Source filter */}
      <div className="flex flex-col">
        <label className="block font-semibold mb-1">Source</label>
        <div className="flex space-x-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="source"
              value=""
              checked={localFilters.source === ""}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">All</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="source"
              value="The Art Institute of Chicago"
              checked={localFilters.source === "The Art Institute of Chicago"}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">Chicago Art Institute</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="source"
              value="Metropolitan Museum of Art"
              checked={localFilters.source === "Metropolitan Museum of Art"}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">Met Museum</span>
          </label>
        </div>
      </div>

      {/* Artwork Type filter */}
      <div className="flex flex-col">
        <label className="block font-semibold mb-1">Artwork Type</label>
        <select
          name="artworkType"
          value={localFilters.artworkType}
          onChange={handleInputChange}
          className="form-select bg-gray-300 rounded"
        >
          <option value="">All Types</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Drawing">Drawing</option>
          <option value="Print">Print</option>
        </select>
      </div>

      {/* Year Range filter */}
      <div className="flex flex-col">
        <label className="block font-semibold mb-1">Date Range*</label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="yearBegin"
            value={localFilters.yearBegin}
            onChange={handleInputChange}
            className="border p-1 rounded bg-gray-300 w-20"
            placeholder="From"
          />
          <input
            type="number"
            name="yearEnd"
            value={localFilters.yearEnd}
            onChange={handleInputChange}
            className="border p-1 rounded bg-gray-300 w-20"
            placeholder="To"
          />
        </div>
        <p className="block text-xs mt-1">*Start and End Date Required</p>
      </div>

      {/* Is Highlight filter */}
      <div className="flex items-center">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="isHighlight"
            checked={localFilters.isHighlight}
            onChange={handleCheckboxChange}
            className="form-checkbox"
          />
          <span className="ml-2">Show Popular Artworks</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex items-center">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-zinc-500 text-white font-semibold rounded hover:bg-orange-600 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
