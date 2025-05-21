import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * SearchForm component for searching movies
 */
const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="bg-netflix-dark-gray p-6 rounded-lg mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Buscar películas por título..."
            className="w-full px-4 py-3 bg-netflix-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Búsqueda de películas"
          />
        </div>
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
          disabled={!query.trim()}
        >
          Buscar
        </button>
      </form>
      <p className="text-gray-400 mt-2 text-sm">
        Ingresa el título de la película que deseas encontrar
      </p>
    </div>
  );
};

export default SearchForm;
