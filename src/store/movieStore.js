import { create } from 'zustand';
import api, { tmdbApi } from '../services/api';

// Define genre IDs for Action, Comedy, and Drama
const GENRE_IDS = {
  ACTION: 28,
  COMEDY: 35,
  DRAMA: 18,
};

const useMovieStore = create((set, get) => ({
  // State
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

  // Actions
  fetchTrendingMovies: async () => {
    try {
      set({ isLoading: true, error: null });
      const movies = await tmdbApi.getTrending();
      set({ trendingMovies: movies, isLoading: false });
    } catch (error) {
      console.error('Error in fetchTrendingMovies:', error);
      set({ error: 'Failed to fetch trending movies', isLoading: false });
    }
  },

  fetchMoviesByGenre: async (genreId) => {
    try {
      set({ isLoading: true, error: null });
      const movies = await tmdbApi.getMoviesByGenre(genreId);
      set((state) => ({
        genreMovies: {
          ...state.genreMovies,
          [genreId]: movies,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Error in fetchMoviesByGenre for genre ${genreId}:`, error);
      set({ error: `Failed to fetch movies for genre ${genreId}`, isLoading: false });
    }
  },

  fetchAllGenreMovies: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Fetch movies for all three genres in parallel
      const [actionMovies, comedyMovies, dramaMovies] = await Promise.all([
        tmdbApi.getMoviesByGenre(GENRE_IDS.ACTION),
        tmdbApi.getMoviesByGenre(GENRE_IDS.COMEDY),
        tmdbApi.getMoviesByGenre(GENRE_IDS.DRAMA),
      ]);
      
      set({
        genreMovies: {
          [GENRE_IDS.ACTION]: actionMovies,
          [GENRE_IDS.COMEDY]: comedyMovies,
          [GENRE_IDS.DRAMA]: dramaMovies,
        },
        isLoading: false,
      });
    } catch (error) {
      console.error('Error in fetchAllGenreMovies:', error);
      set({ error: 'Failed to fetch genre movies', isLoading: false });
    }
  },

  fetchMovieDetails: async (movieId) => {
    try {
      set({ isLoading: true, error: null });
      const movie = await tmdbApi.getMovieDetails(movieId);
      set({ currentMovie: movie, isLoading: false });
      return movie;
    } catch (error) {
      console.error(`Error in fetchMovieDetails for movie ${movieId}:`, error);
      set({ error: `Failed to fetch details for movie ${movieId}`, isLoading: false });
      throw error;
    }
  },

  searchMovies: async (query) => {
    if (!query || query.trim() === '') {
      set({ searchResults: [], isLoading: false });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      const data = await tmdbApi.searchMovies(query);
      set({ searchResults: data.results, isLoading: false });
      return data.results;
    } catch (error) {
      console.error(`Error in searchMovies for query "${query}":`, error);
      set({ error: 'Failed to search movies', isLoading: false });
      throw error;
    }
  },

  fetchGenres: async () => {
    try {
      set({ isLoading: true, error: null });
      const genres = await tmdbApi.getGenres();
      set({ genres, isLoading: false });
    } catch (error) {
      console.error('Error in fetchGenres:', error);
      set({ error: 'Failed to fetch genres', isLoading: false });
    }
  },

  clearCurrentMovie: () => set({ currentMovie: null }),
  clearSearchResults: () => set({ searchResults: [] }),
  clearError: () => set({ error: null }),
}));

// Export constants and store
export { GENRE_IDS };
export default useMovieStore;
