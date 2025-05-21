import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, imageSizes } from '../../services/api';

/**
 * MovieCard component for displaying a movie in grid or list views
 * @param {Object} movie - The movie object containing title, poster_path, etc.
 * @param {string} size - Size of the card (small, medium, large)
 */
const MovieCard = ({ movie, size = 'medium' }) => {
  if (!movie) return null;
  
  // Determine image size based on card size
  const posterSize = 
    size === 'small' ? imageSizes.poster.small : 
    size === 'large' ? imageSizes.poster.large : 
    imageSizes.poster.medium;
  
  // Fallback image if poster is not available
  const posterUrl = movie.poster_path 
    ? getImageUrl(movie.poster_path, posterSize)
    : 'https://via.placeholder.com/342x513?text=No+Image';
  
  // Format release year if available
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : '';

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card block">
      {/* Poster Image */}
      <div className="relative">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full rounded-md shadow-lg"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className={`absolute top-2 right-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold
            ${movie.vote_average >= 7 ? 'bg-green-600' : 
              movie.vote_average >= 5 ? 'bg-yellow-600' : 'bg-red-600'}`}>
            {Math.round(movie.vote_average * 10) / 10}
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
            <span className="bg-netflix-red px-3 py-1 rounded-full text-sm">Ver detalles</span>
          </div>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="mt-2">
        <h3 className="movie-title truncate">{movie.title}</h3>
        {releaseYear && (
          <p className="text-gray-400 text-sm">{releaseYear}</p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
