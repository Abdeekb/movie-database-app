// src/components/Navigation.jsx
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">🎬 MovieApp</div>
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-yellow-400">
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
