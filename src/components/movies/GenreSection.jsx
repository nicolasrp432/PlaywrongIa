import React, { useRef } from 'react';
import MovieCard from './MovieCard';

/**
 * GenreSection component for displaying a horizontal scrollable section of movies by genre
 * @param {string} title - Section title (genre name)
 * @param {Array} movies - Array of movie objects to display
 * @param {boolean} isLoading - Loading state
 */
const GenreSection = ({ title, movies = [], isLoading = false }) => {
  const scrollContainerRef = useRef(null);

  // Scroll functions for horizontal navigation
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="section-title">{title}</h2>
        <div className="flex items-center justify-center h-48 bg-netflix-dark-gray rounded-md">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // No movies state
  if (!movies || movies.length === 0) {
    return (
      <div className="my-8">
        <h2 className="section-title">{title}</h2>
        <div className="flex items-center justify-center h-48 bg-netflix-dark-gray rounded-md">
          <p className="text-gray-400">No hay películas disponibles en esta categoría</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h2 className="section-title">{title}</h2>
      
      {/* Scrollable container with movies */}
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <div key={movie.id} className="flex-shrink-0 w-[180px]">
              <MovieCard movie={movie} size="small" />
            </div>
          ))}
        </div>
        
        {/* Scroll buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GenreSection;
