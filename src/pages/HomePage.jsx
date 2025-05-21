import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/layout/Layout';
import MovieCarousel from '../components/movies/MovieCarousel';
import GenreSection from '../components/movies/GenreSection';
import useMovieStore, { GENRE_IDS } from '../store/movieStore';

/**
 * HomePage component - Main landing page with featured movies and genre sections
 */
const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  // Get data and actions from store
  const { 
    trendingMovies, 
    genreMovies,
    genres,
    isLoading, 
    error,
    fetchTrendingMovies,
    fetchAllGenreMovies,
    fetchGenres
  } = useMovieStore();

  // Fetch data on component mount
  useEffect(() => {
    // Fetch trending movies for carousel
    fetchTrendingMovies();
    
    // Fetch movies for each genre section
    fetchAllGenreMovies();
    
    // Fetch genres list
    fetchGenres();
  }, [fetchTrendingMovies, fetchAllGenreMovies, fetchGenres]);

  // Get genre names from the genres list
  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Género';
  };

  // Filter trending movies to ensure unique backdrop images for carousel
  let featuredMovies = trendingMovies
    .filter(movie => movie.backdrop_path) // Only include movies with backdrop images
    .reduce((unique, movie) => {
      // Check if we already have a movie with this backdrop
      const isDuplicate = unique.some(m => m.backdrop_path === movie.backdrop_path);
      // If not a duplicate and we have less than 3 movies, add it
      if (!isDuplicate && unique.length < 3) {
        unique.push(movie);
      }
      return unique;
    }, []);
    
  // If we don't have 3 unique backdrops, just take the first 3 movies
  if (featuredMovies.length < 3 && trendingMovies.length >= 3) {
    console.log('Not enough unique backdrops, using first 3 trending movies');
    featuredMovies = trendingMovies.slice(0, 3);
  }

  return (
    <Layout>
      {/* Hero Carousel */}
      <MovieCarousel movies={featuredMovies} />
      
      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-800 text-white p-4 rounded-md mb-8">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Welcome Message for Non-authenticated Users */}
        {!isAuthenticated && (
          <div className="bg-netflix-dark-gray p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-2">¡Bienvenido a PlaywrongIA!</h2>
            <p className="text-gray-300 mb-4">
              Descubre las mejores películas organizadas por géneros. Para una experiencia completa, 
              inicia sesión con tu cuenta.
            </p>
            <button 
              onClick={() => loginWithRedirect()}
              className="btn-primary"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
        
        {/* Genre Sections */}
        <GenreSection 
          title={`Películas de ${getGenreName(GENRE_IDS.ACTION)}`}
          movies={genreMovies[GENRE_IDS.ACTION]}
          isLoading={isLoading && genreMovies[GENRE_IDS.ACTION].length === 0}
        />
        
        <GenreSection 
          title={`Películas de ${getGenreName(GENRE_IDS.COMEDY)}`}
          movies={genreMovies[GENRE_IDS.COMEDY]}
          isLoading={isLoading && genreMovies[GENRE_IDS.COMEDY].length === 0}
        />
        
        <GenreSection 
          title={`Películas de ${getGenreName(GENRE_IDS.DRAMA)}`}
          movies={genreMovies[GENRE_IDS.DRAMA]}
          isLoading={isLoading && genreMovies[GENRE_IDS.DRAMA].length === 0}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
