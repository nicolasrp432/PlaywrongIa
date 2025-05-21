import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../../components/movies/MovieCard';
import { mockTrendingMovies } from '../mocks/mockData';

// Mock the getImageUrl function from the API service
vi.mock('../../services/api', () => ({
  getImageUrl: (path) => `https://mocked-image-url.com${path}`,
  imageSizes: {
    poster: {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
      original: 'original',
    },
  },
}));

describe('MovieCard Component', () => {
  // Sample movie data for testing
  const movie = mockTrendingMovies[0];
  
  // Helper function to render the component with router context
  const renderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter });
  };
  
  it('renders movie card with correct title', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    
    // Check if the movie title is rendered
    expect(screen.getByText(movie.title)).toBeInTheDocument();
  });
  
  it('renders movie card with poster image', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    
    // Check if the poster image is rendered with correct alt text
    const posterImage = screen.getByAltText(movie.title);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', `https://mocked-image-url.com${movie.poster_path}`);
  });
  
  it('renders release year if available', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    
    // Extract the year from the release date
    const releaseYear = new Date(movie.release_date).getFullYear().toString();
    
    // Check if the release year is rendered
    expect(screen.getByText(releaseYear)).toBeInTheDocument();
  });
  
  it('renders rating badge if vote average is available', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    
    // Format the vote average to match the component's formatting
    const formattedRating = Math.round(movie.vote_average * 10) / 10;
    
    // Check if the rating is rendered
    expect(screen.getByText(formattedRating.toString())).toBeInTheDocument();
  });
  
  it('links to the correct movie detail page', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    
    // Find the link element
    const linkElement = screen.getByRole('link');
    
    // Check if the link points to the correct movie detail page
    expect(linkElement).toHaveAttribute('href', `/movie/${movie.id}`);
  });
  
  it('handles movie without poster path', () => {
    // Create a movie without poster_path
    const movieWithoutPoster = { ...movie, poster_path: null };
    
    renderWithRouter(<MovieCard movie={movieWithoutPoster} />);
    
    // Check if a placeholder image is used
    const posterImage = screen.getByAltText(movie.title);
    expect(posterImage).toHaveAttribute('src', 'https://via.placeholder.com/342x513?text=No+Image');
  });
  
  it('renders different sizes based on size prop', () => {
    // Test with small size
    renderWithRouter(<MovieCard movie={movie} size="small" />);
    
    // Clean up
    cleanup();
    
    // Test with large size
    renderWithRouter(<MovieCard movie={movie} size="large" />);
  });
});
