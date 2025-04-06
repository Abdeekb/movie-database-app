// src/components/MovieSearch.jsx
import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';

const MovieSearch = ({ onSelectMovie }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setPage(1); // Reset to page 1 for new searches
    
    try {
      const data = await searchMovies(query.trim(), 1);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults, 10) || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch movies');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Load more movies when page changes
  useEffect(() => {
    const loadMoreMovies = async () => {
      if (page === 1 || !query.trim()) return; // Skip if it's page 1 or no query
      
      setLoading(true);
      
      try {
        const data = await searchMovies(query.trim(), page);
        // Append new movies to existing list
        setMovies(prevMovies => [...prevMovies, ...(data.Search || [])]);
      } catch (err) {
        setError(err.message || 'Failed to load more movies');
      } finally {
        setLoading(false);
      }
    };
    
    loadMoreMovies();
  }, [page, query]);

  const loadMore = () => {
    if (movies.length < totalResults) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie Database</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Loading State */}
      {loading && page === 1 && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Movie Results */}
      {movies.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Search Results</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div 
                key={movie.imdbID} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img 
                    src={movie.Poster} 
                    alt={`${movie.Title} poster`} 
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No poster available</span>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                  
                  <button 
                    onClick={() => onSelectMovie(movie.imdbID)}
                    className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {movies.length < totalResults && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* No Results */}
      {!loading && movies.length === 0 && query.trim() !== '' && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No movies found for "{query}". Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;