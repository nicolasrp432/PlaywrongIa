import React from 'react';
import MovieCard from '../movies/MovieCard';

/**
 * SearchResults component for displaying search results
 * @param {Array} results - Array of movie objects from search results
 * @param {boolean} isLoading - Loading state
 * @param {string} query - The search query
 */
const SearchResults = ({ results = [], isLoading = false, query = '' }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="loading-spinner mb-4"></div>
        <p className="text-gray-300">Buscando películas...</p>
      </div>
    );
  }

  // No query state
  if (!query) {
    return (
      <div className="text-center py-12">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto text-gray-500 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <h2 className="text-2xl font-bold mb-2">Busca tus películas favoritas</h2>
        <p className="text-gray-400">
          Ingresa un título en el campo de búsqueda para encontrar películas
        </p>
      </div>
    );
  }

  // No results state
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto text-gray-500 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h2 className="text-2xl font-bold mb-2">No se encontraron resultados</h2>
        <p className="text-gray-400">
          No hay películas que coincidan con "{query}"
        </p>
        <p className="text-gray-500 mt-2">
          Intenta con otro término de búsqueda
        </p>
      </div>
    );
  }

  // Results found
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Resultados para "{query}"
        </h2>
        <p className="text-gray-400">
          Se encontraron {results.length} películas
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
