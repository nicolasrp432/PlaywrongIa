import { http, HttpResponse } from 'msw';

// Mock data for tests
import { mockTrendingMovies } from './mockData';
import { mockMoviesByGenre } from './mockData';
import { mockMovieDetails } from './mockData';
import { mockSearchResults } from './mockData';

// Base URL for TMDB API
const baseUrl = 'https://api.themoviedb.org/3';

// Define handlers for mock API requests
export const handlers = [
  // Mock trending movies endpoint
  http.get(`${baseUrl}/trending/movie/week`, () => {
    return HttpResponse.json({
      page: 1,
      results: mockTrendingMovies,
      total_pages: 1,
      total_results: mockTrendingMovies.length,
    });
  }),

  // Mock movies by genre endpoint
  http.get(`${baseUrl}/discover/movie`, ({ request }) => {
    const url = new URL(request.url);
    const genreId = url.searchParams.get('with_genres');
    
    return HttpResponse.json({
      page: 1,
      results: mockMoviesByGenre[genreId] || [],
      total_pages: 1,
      total_results: (mockMoviesByGenre[genreId] || []).length,
    });
  }),

  // Mock movie details endpoint
  http.get(`${baseUrl}/movie/:id`, ({ params }) => {
    const { id } = params;
    const movie = mockMovieDetails[id];
    
    if (!movie) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(movie);
  }),

  // Mock search movies endpoint
  http.get(`${baseUrl}/search/movie`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    
    // Filter mock results based on query
    const results = query 
      ? mockSearchResults.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      : [];
    
    return HttpResponse.json({
      page: 1,
      results,
      total_pages: 1,
      total_results: results.length,
    });
  }),

  // Mock genres list endpoint
  http.get(`${baseUrl}/genre/movie/list`, () => {
    return HttpResponse.json({
      genres: [
        { id: 28, name: 'Acción' },
        { id: 35, name: 'Comedia' },
        { id: 18, name: 'Drama' },
        { id: 27, name: 'Terror' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Ciencia ficción' },
      ],
    });
  }),
];

export default handlers;
