// src/App.jsx
import { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const openMovieDetails = (imdbId) => {
    setSelectedMovieId(imdbId);
  };

  const closeMovieDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modified MovieSearch to handle movie selection */}
      <MovieSearch onSelectMovie={openMovieDetails} />
      
      {/* Movie Details Modal */}
      {selectedMovieId && (
        <MovieDetails 
          imdbId={selectedMovieId} 
          onClose={closeMovieDetails} 
        />
      )}
    </div>
  );
}

export default App;