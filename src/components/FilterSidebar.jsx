import { useState } from "react";

const FilterSidebar = ({ filters, setFilters }) => {
  const { source } = filters;

  const handleSourceChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      source: event.target.value,
    }));
  };

  return (
    <div className="filter-sidebar p-4 bg-gray-100 rounded">
      <h3 className="text-lg mb-4">Filters</h3>

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
    </div>
  );
};

export default FilterSidebar;
