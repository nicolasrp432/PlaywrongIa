import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';
import useMovieStore from '../store/movieStore';

/**
 * SearchPage component - Allows users to search for movies and displays results
 */
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Get data and actions from store
  const { 
    searchResults, 
    isLoading, 
    error, 
    searchMovies,
    clearSearchResults
  } = useMovieStore();

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      searchMovies(query);
    } else {
      clearSearchResults();
    }
    
    // Clear search results on unmount
    return () => clearSearchResults();
  }, [query, searchMovies, clearSearchResults]);

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">Buscar Películas</h1>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-800 text-white p-4 rounded-md mb-8">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Search Form */}
        <SearchForm />
        
        {/* Search Results */}
        <SearchResults 
          results={searchResults} 
          isLoading={isLoading} 
          query={query} 
        />
      </div>
    </Layout>
  );
};

export default SearchPage;
