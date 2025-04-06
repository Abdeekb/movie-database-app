// src/components/MovieList.jsx
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (movies.length === 0) return <p className="text-center mt-4">No movies found.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={dragon} />
      ))}
    </div>
  );
};

export default MovieList;
