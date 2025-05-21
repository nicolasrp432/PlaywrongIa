import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, imageSizes } from '../../services/api';

/**
 * MovieCarousel component for displaying featured movies in a carousel
 * @param {Array} movies - Array of movie objects to display in the carousel
 */
const MovieCarousel = ({ movies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-rotate carousel every 6 seconds
  useEffect(() => {
    if (movies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [movies.length]);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };
  
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % movies.length
    );
  };
  
  // If no movies, show placeholder
  if (!movies || movies.length === 0) {
    return (
      <div className="carousel-item flex items-center justify-center bg-netflix-dark-gray">
        <div className="text-center p-8">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-xl text-white">Cargando películas destacadas...</p>
        </div>
      </div>
    );
  }
  
  // Get current movie
  const currentMovie = movies[currentIndex];
  const backdropUrl = getImageUrl(
    currentMovie.backdrop_path, 
    imageSizes.backdrop.large
  );
  
  return (
    <div className="relative overflow-hidden">
      {/* Current Slide */}
      <div 
        className="carousel-item"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        
        {/* Content */}
        <div className="carousel-content container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{currentMovie.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-netflix-red font-bold mr-2">
              {Math.round(currentMovie.vote_average * 10) / 10} / 10
            </span>
            <span className="text-gray-300 mr-2">•</span>
            <span className="text-gray-300">
              {currentMovie.release_date ? new Date(currentMovie.release_date).getFullYear() : ''}
            </span>
          </div>
          <p className="text-gray-300 max-w-2xl mb-6 line-clamp-3 md:line-clamp-none">
            {currentMovie.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/movie/${currentMovie.id}`} className="btn-primary">
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-netflix-red' : 'bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
