import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, imageSizes } from '../../services/api';

/**
 * MovieDetail component for displaying detailed information about a movie
 * @param {Object} movie - The movie object with complete details
 */
const MovieDetail = ({ movie, isLoading }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // If no movie data is available or there's an error
  if (!movie || movie.error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Película no encontrada</h2>
        <p className="text-gray-400 mb-6">
          {movie?.message || 'La información de esta película no está disponible.'}
        </p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Format release date
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Fecha desconocida';

  // Get backdrop and poster URLs
  const backdropUrl = movie.backdrop_path 
    ? getImageUrl(movie.backdrop_path, imageSizes.backdrop.large)
    : null;
  
  const posterUrl = movie.poster_path 
    ? getImageUrl(movie.poster_path, imageSizes.poster.large)
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Duración desconocida';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div>
      {/* Backdrop Image */}
      {backdropUrl && (
        <div 
          className="h-[40vh] md:h-[50vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/70 to-transparent"></div>
        </div>
      )}

      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8 -mt-32 md:-mt-48 relative z-10">
          {/* Movie Poster */}
          <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="rounded-lg shadow-2xl w-full max-w-xs mx-auto md:mx-0"
            />
          </div>

          {/* Movie Info */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            
            {/* Release Year, Runtime, Rating */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-300 mb-6">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              {movie.runtime > 0 && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                </>
              )}
              {movie.vote_average > 0 && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {Math.round(movie.vote_average * 10) / 10}
                  </span>
                </>
              )}
            </div>
            
            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id} 
                    className="bg-netflix-light-gray px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Sinopsis</h2>
              <p className="text-gray-300">{movie.overview || 'No hay sinopsis disponible.'}</p>
            </div>
            
            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Release Date */}
              <div>
                <h3 className="text-lg font-bold mb-1">Fecha de estreno</h3>
                <p className="text-gray-300">{releaseDate}</p>
              </div>
              
              {/* Original Title */}
              {movie.original_title && movie.original_title !== movie.title && (
                <div>
                  <h3 className="text-lg font-bold mb-1">Título original</h3>
                  <p className="text-gray-300">{movie.original_title}</p>
                </div>
              )}
              
              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-1">Productoras</h3>
                  <p className="text-gray-300">
                    {movie.production_companies.map(company => company.name).join(', ')}
                  </p>
                </div>
              )}
              
              {/* Budget & Revenue */}
              {(movie.budget > 0 || movie.revenue > 0) && (
                <div>
                  <h3 className="text-lg font-bold mb-1">Presupuesto & Recaudación</h3>
                  <p className="text-gray-300">
                    {movie.budget > 0 ? `Presupuesto: $${movie.budget.toLocaleString()}` : ''}
                    {movie.budget > 0 && movie.revenue > 0 ? ' | ' : ''}
                    {movie.revenue > 0 ? `Recaudación: $${movie.revenue.toLocaleString()}` : ''}
                  </p>
                </div>
              )}
            </div>
            
            {/* Back Button */}
            <Link to="/" className="btn-primary inline-block">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
