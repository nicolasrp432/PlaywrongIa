import { describe, it, expect, beforeEach, vi } from 'vitest';
import useMovieStore, { GENRE_IDS } from '../../store/movieStore';
import { tmdbApi } from '../../services/api';
import { mockTrendingMovies, mockMoviesByGenre, mockMovieDetails } from '../mocks/mockData';

// Mock the API service
vi.mock('../../services/api', () => {
  return {
    tmdbApi: {
      getTrending: vi.fn(),
      getMoviesByGenre: vi.fn(),
      getMovieDetails: vi.fn(),
      searchMovies: vi.fn(),
      getGenres: vi.fn(),
    },
    getImageUrl: vi.fn(),
    imageSizes: {
      poster: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        original: 'original',
      },
      backdrop: {
        small: 'w300',
        medium: 'w780',
        large: 'w1280',
        original: 'original',
      },
    },
  };
});

describe('Movie Store', () => {
  // Reset the store before each test
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    
    // Reset the store to its initial state
    const { setState } = useMovieStore;
    setState({
      trendingMovies: [],
      genreMovies: {
        [GENRE_IDS.ACTION]: [],
        [GENRE_IDS.COMEDY]: [],
        [GENRE_IDS.DRAMA]: [],
      },
      currentMovie: null,
      searchResults: [],
      genres: [],
      isLoading: false,
      error: null,
    });
  });

  describe('fetchTrendingMovies', () => {
    it('should fetch trending movies and update state', async () => {
      // Mock the API response
      tmdbApi.getTrending.mockResolvedValue(mockTrendingMovies);
      
      // Get actions from the store
      const { fetchTrendingMovies } = useMovieStore.getState();
      
      // Call the action
      await fetchTrendingMovies();
      
      // Get the updated state
      const { trendingMovies, isLoading, error } = useMovieStore.getState();
      
      // Verify the API was called
      expect(tmdbApi.getTrending).toHaveBeenCalledTimes(1);
      
      // Verify the state was updated correctly
      expect(trendingMovies).toEqual(mockTrendingMovies);
      expect(isLoading).toBe(false);
      expect(error).toBeNull();
    });
    
    it('should handle errors when fetching trending movies', async () => {
      // Mock the API to throw an error
      const errorMessage = 'Failed to fetch trending movies';
      tmdbApi.getTrending.mockRejectedValue(new Error(errorMessage));
      
      // Get actions from the store
      const { fetchTrendingMovies } = useMovieStore.getState();
      
      // Call the action
      await fetchTrendingMovies();
      
      // Get the updated state
      const { trendingMovies, isLoading, error } = useMovieStore.getState();
      
      // Verify the API was called
      expect(tmdbApi.getTrending).toHaveBeenCalledTimes(1);
      
      // Verify the state was updated correctly
      expect(trendingMovies).toEqual([]);
      expect(isLoading).toBe(false);
      expect(error).toBe('Failed to fetch trending movies');
    });
  });

  describe('fetchMoviesByGenre', () => {
    it('should fetch movies by genre and update state', async () => {
      // Mock the API response
      const genreId = GENRE_IDS.ACTION;
      tmdbApi.getMoviesByGenre.mockResolvedValue(mockMoviesByGenre[genreId]);
      
      // Get actions from the store
      const { fetchMoviesByGenre } = useMovieStore.getState();
      
      // Call the action
      await fetchMoviesByGenre(genreId);
      
      // Get the updated state
      const { genreMovies, isLoading, error } = useMovieStore.getState();
      
      // Verify the API was called with the correct genre ID
      expect(tmdbApi.getMoviesByGenre).toHaveBeenCalledTimes(1);
      expect(tmdbApi.getMoviesByGenre).toHaveBeenCalledWith(genreId);
      
      // Verify the state was updated correctly
      expect(genreMovies[genreId]).toEqual(mockMoviesByGenre[genreId]);
      expect(isLoading).toBe(false);
      expect(error).toBeNull();
    });
  });

  describe('fetchMovieDetails', () => {
    it('should fetch movie details and update state', async () => {
      // Mock the API response
      const movieId = '1';
      tmdbApi.getMovieDetails.mockResolvedValue(mockMovieDetails[movieId]);
      
      // Get actions from the store
      const { fetchMovieDetails } = useMovieStore.getState();
      
      // Call the action
      await fetchMovieDetails(movieId);
      
      // Get the updated state
      const { currentMovie, isLoading, error } = useMovieStore.getState();
      
      // Verify the API was called with the correct movie ID
      expect(tmdbApi.getMovieDetails).toHaveBeenCalledTimes(1);
      expect(tmdbApi.getMovieDetails).toHaveBeenCalledWith(movieId);
      
      // Verify the state was updated correctly
      expect(currentMovie).toEqual(mockMovieDetails[movieId]);
      expect(isLoading).toBe(false);
      expect(error).toBeNull();
    });
  });

  describe('searchMovies', () => {
    it('should search movies and update state', async () => {
      // Mock the API response
      const query = 'test';
      const mockResults = { results: [{ id: 1, title: 'Test Movie' }] };
      tmdbApi.searchMovies.mockResolvedValue(mockResults);
      
      // Get actions from the store
      const { searchMovies } = useMovieStore.getState();
      
      // Call the action
      await searchMovies(query);
      
      // Get the updated state
      const { searchResults, isLoading, error } = useMovieStore.getState();
      
      // Verify the API was called with the correct query
      expect(tmdbApi.searchMovies).toHaveBeenCalledTimes(1);
      expect(tmdbApi.searchMovies).toHaveBeenCalledWith(query);
      
      // Verify the state was updated correctly
      expect(searchResults).toEqual(mockResults.results);
      expect(isLoading).toBe(false);
      expect(error).toBeNull();
    });
    
    it('should clear search results when query is empty', async () => {
      // Get actions from the store
      const { searchMovies } = useMovieStore.getState();
      
      // Call the action with an empty query
      await searchMovies('');
      
      // Get the updated state
      const { searchResults } = useMovieStore.getState();
      
      // Verify the API was not called
      expect(tmdbApi.searchMovies).not.toHaveBeenCalled();
      
      // Verify the state was updated correctly
      expect(searchResults).toEqual([]);
    });
  });

  describe('utility actions', () => {
    it('should clear current movie', () => {
      // Set a current movie first
      useMovieStore.setState({ currentMovie: mockMovieDetails['1'] });
      
      // Get actions from the store
      const { clearCurrentMovie } = useMovieStore.getState();
      
      // Call the action
      clearCurrentMovie();
      
      // Get the updated state
      const { currentMovie } = useMovieStore.getState();
      
      // Verify the state was updated correctly
      expect(currentMovie).toBeNull();
    });
    
    it('should clear search results', () => {
      // Set search results first
      useMovieStore.setState({ searchResults: [{ id: 1, title: 'Test Movie' }] });
      
      // Get actions from the store
      const { clearSearchResults } = useMovieStore.getState();
      
      // Call the action
      clearSearchResults();
      
      // Get the updated state
      const { searchResults } = useMovieStore.getState();
      
      // Verify the state was updated correctly
      expect(searchResults).toEqual([]);
    });
    
    it('should clear error', () => {
      // Set an error first
      useMovieStore.setState({ error: 'Test error' });
      
      // Get actions from the store
      const { clearError } = useMovieStore.getState();
      
      // Call the action
      clearError();
      
      // Get the updated state
      const { error } = useMovieStore.getState();
      
      // Verify the state was updated correctly
      expect(error).toBeNull();
    });
  });
});
