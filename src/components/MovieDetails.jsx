// src/components/MovieDetails.jsx
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';

const MovieDetails = ({ imdbId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!imdbId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getMovieDetails(imdbId);
        setMovie(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [imdbId]);

  if (!imdbId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && !loading && (
          <div className="p-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}
        
        {/* Movie details */}
        {movie && !loading && !error && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Movie poster */}
              <div className="md:w-1/3">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img 
                    src={movie.Poster} 
                    alt={`${movie.Title} poster`} 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">No poster available</span>
                  </div>
                )}
              </div>
              
              {/* Movie information */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded">{movie.Year}</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded">{movie.Rated}</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded">{movie.Runtime}</span>
                </div>
                
                {/* Genres */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(', ').map((genre) => (
                      <span key={genre} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">{genre}</span>
                    ))}
                  </div>
                </div>
                
                {/* Plot */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Plot</h3>
                  <p className="text-gray-700">{movie.Plot}</p>
                </div>
                
                {/* Cast */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Cast</h3>
                  <p className="text-gray-700">{movie.Actors}</p>
                </div>
                
                {/* Director */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Director</h3>
                  <p className="text-gray-700">{movie.Director}</p>
                </div>
                
                {/* Ratings */}
                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Ratings</h3>
                    <div className="space-y-2">
                      {movie.Ratings.map((rating) => (
                        <div key={rating.Source} className="flex items-center">
                          <span className="w-1/3 font-medium">{rating.Source}</span>
                          <span className="text-gray-700">{rating.Value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Other details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Released</h3>
                    <p className="text-gray-700">{movie.Released}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Box Office</h3>
                    <p className="text-gray-700">{movie.BoxOffice || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Country</h3>
                    <p className="text-gray-700">{movie.Country}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Language</h3>
                    <p className="text-gray-700">{movie.Language}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;