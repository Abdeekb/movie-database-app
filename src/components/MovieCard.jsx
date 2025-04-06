// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="border rounded shadow p-2 hover:shadow-lg transition">
      <img src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'} alt={movie.Title} className="w-full h-64 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
      <p className="text-sm">{movie.Year}</p>
    </Link>
  );
};

export default MovieCard;
