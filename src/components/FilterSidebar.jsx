import { useState } from "react";

const FilterSidebar = ({ filters, setFilters }) => {
  const { source, artworkType, yearBegin, yearEnd, isHighlight } = filters;

  const handleSourceChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      source: event.target.value,
    }));
  };

  const handleArtworkTypeChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      artworkType: event.target.value,
    }));
  };

  const handleYearBeginChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      yearBegin: event.target.value,
    }));
  };

  const handleYearEndChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      yearEnd: event.target.value,
    }));
  };

  const handleIsHighlightChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      isHighlight: event.target.checked,
    }));
  };

  return (
    <div className="filter-sidebar p-4 bg-gray-100 rounded">
      <h3 className="text-lg mb-4">Filters</h3>

      {/* Source filter */}
      <label className="block mb-2 font-semibold">Source</label>
      <div className="flex flex-col">
        <label className="inline-flex items-center mb-2">
          <input
            type="radio"
            value=""
            checked={source === ""}
            onChange={handleSourceChange}
            className="form-radio"
          />
          <span className="ml-2">All Sources</span>
        </label>
        <label className="inline-flex items-center mb-2">
          <input
            type="radio"
            value="The Art Institute of Chicago"
            checked={source === "The Art Institute of Chicago"}
            onChange={handleSourceChange}
            className="form-radio"
          />
          <span className="ml-2">The Art Institute of Chicago</span>
        </label>
        <label className="inline-flex items-center mb-2">
          <input
            type="radio"
            value="Metropolitan Museum of Art"
            checked={source === "Metropolitan Museum of Art"}
            onChange={handleSourceChange}
            className="form-radio"
          />
          <span className="ml-2">Metropolitan Museum of Art</span>
        </label>
      </div>

      {/* Artwork Type filter */}
      <label className="block mb-2 font-semibold">Artwork Type</label>
      <select
        value={artworkType || ""}
        onChange={handleArtworkTypeChange}
        className="form-select mb-4 bg-gray-300"
      >
        <option value="">All Types</option>
        <option value="Painting">Painting</option>
        <option value="Sculpture">Sculpture</option>
        <option value="Drawing">Drawing</option>
      </select>

      {/* Year Range filter */}
      <label className="block mb-2 font-semibold mt-4">Date Range</label>
      <div className="flex">
        <input
          type="number"
          value={yearBegin}
          onChange={handleYearBeginChange}
          className="border p-1 rounded w-1/2 mr-2 bg-gray-300"
          placeholder="Year Begin"
        />
        <input
          type="number"
          value={yearEnd}
          onChange={handleYearEndChange}
          className="border p-1 rounded w-1/2 bg-gray-300"
          placeholder="Year End"
        />
      </div>

      {/* Is Highlight filter */}
      <label className="inline-flex items-center mb-2 mt-4">
        <input
          type="checkbox"
          checked={isHighlight}
          onChange={handleIsHighlightChange}
          className="form-checkbox"
        />
        <span className="ml-2">Show Highlights</span>
      </label>
    </div>
  );
};

export default FilterSidebar;
