import React, { useState } from 'react';

const JobSearchForm = ({ onSearch }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [fullTimeOnly, setFullTimeOnly] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Call the onSearch callback and pass the search parameters
    onSearch({ description, location, fullTimeOnly });
  };

  return (
    <form className="container mx-auto my-4" onSubmit={handleSearch}>
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none border border-blue-500 rounded bg-transparent w-2/4 text-gray-700 mr-3 p-4 leading-tight focus:outline-none"
          type="text"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="appearance-none border border-blue-500 rounded bg-transparent w-2/4 text-gray-700 mr-3 p-4 leading-tight focus:outline-none"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label className="flex w-1/4 items-center">
          <input
            className="mr-1"
            type="checkbox"
            checked={fullTimeOnly}
            onChange={(e) => setFullTimeOnly(e.target.checked)}
          />
          <span className="text-sm">Full Time Only</span>
        </label>
        <button
          className="bg-blue-500 w-1/4 hover:bg-blue-700 text-white font-bold p-4 ml-2 rounded focus:outline-none"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default JobSearchForm;