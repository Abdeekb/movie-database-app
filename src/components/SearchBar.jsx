// src/components/SearchBar.jsx
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border rounded-l px-4 py-2 w-1/2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
