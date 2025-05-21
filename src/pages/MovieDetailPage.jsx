import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MovieDetail from '../components/movies/MovieDetail';
import useMovieStore from '../store/movieStore';

/**
 * MovieDetailPage component - Displays detailed information about a specific movie
 */
const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get data and actions from store
  const { 
    currentMovie, 
    isLoading, 
    error, 
    fetchMovieDetails,
    clearCurrentMovie
  } = useMovieStore();

  // Fetch movie details on component mount or when ID changes
  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
    
    // Clear current movie on unmount
    return () => clearCurrentMovie();
  }, [id, fetchMovieDetails, clearCurrentMovie]);

  return (
    <Layout>
      {/* Error Message */}
      {error && (
        <div className="container-custom py-8">
          <div className="bg-red-900/50 border border-red-800 text-white p-4 rounded-md mb-8">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {/* Movie Details */}
      <MovieDetail movie={currentMovie} isLoading={isLoading} />
    </Layout>
  );
};

export default MovieDetailPage;
