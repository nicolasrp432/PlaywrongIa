/**
 * Mock data for testing
 * This file contains mock movie data for use in tests
 */

// Mock trending movies
export const mockTrendingMovies = [
  {
    id: 1,
    title: 'Película Trending 1',
    overview: 'Descripción de la película trending 1',
    poster_path: '/poster1.jpg',
    backdrop_path: '/backdrop1.jpg',
    release_date: '2025-01-15',
    vote_average: 8.5,
    genre_ids: [28, 878],
  },
  {
    id: 2,
    title: 'Película Trending 2',
    overview: 'Descripción de la película trending 2',
    poster_path: '/poster2.jpg',
    backdrop_path: '/backdrop2.jpg',
    release_date: '2025-02-20',
    vote_average: 7.8,
    genre_ids: [35, 10749],
  },
  {
    id: 3,
    title: 'Película Trending 3',
    overview: 'Descripción de la película trending 3',
    poster_path: '/poster3.jpg',
    backdrop_path: '/backdrop3.jpg',
    release_date: '2025-03-10',
    vote_average: 9.2,
    genre_ids: [18, 80],
  },
];

// Mock movies by genre
export const mockMoviesByGenre = {
  // Action movies (ID: 28)
  '28': [
    {
      id: 4,
      title: 'Película de Acción 1',
      overview: 'Descripción de la película de acción 1',
      poster_path: '/action1.jpg',
      release_date: '2025-01-05',
      vote_average: 7.5,
      genre_ids: [28, 12],
    },
    {
      id: 5,
      title: 'Película de Acción 2',
      overview: 'Descripción de la película de acción 2',
      poster_path: '/action2.jpg',
      release_date: '2025-02-15',
      vote_average: 8.1,
      genre_ids: [28, 53],
    },
    {
      id: 6,
      title: 'Película de Acción 3',
      overview: 'Descripción de la película de acción 3',
      poster_path: '/action3.jpg',
      release_date: '2025-03-25',
      vote_average: 6.9,
      genre_ids: [28, 878],
    },
  ],
  
  // Comedy movies (ID: 35)
  '35': [
    {
      id: 7,
      title: 'Película de Comedia 1',
      overview: 'Descripción de la película de comedia 1',
      poster_path: '/comedy1.jpg',
      release_date: '2025-01-10',
      vote_average: 7.2,
      genre_ids: [35, 10749],
    },
    {
      id: 8,
      title: 'Película de Comedia 2',
      overview: 'Descripción de la película de comedia 2',
      poster_path: '/comedy2.jpg',
      release_date: '2025-02-20',
      vote_average: 6.5,
      genre_ids: [35, 18],
    },
    {
      id: 9,
      title: 'Película de Comedia 3',
      overview: 'Descripción de la película de comedia 3',
      poster_path: '/comedy3.jpg',
      release_date: '2025-03-30',
      vote_average: 8.3,
      genre_ids: [35, 12],
    },
  ],
  
  // Drama movies (ID: 18)
  '18': [
    {
      id: 10,
      title: 'Película de Drama 1',
      overview: 'Descripción de la película de drama 1',
      poster_path: '/drama1.jpg',
      release_date: '2025-01-15',
      vote_average: 8.7,
      genre_ids: [18, 36],
    },
    {
      id: 11,
      title: 'Película de Drama 2',
      overview: 'Descripción de la película de drama 2',
      poster_path: '/drama2.jpg',
      release_date: '2025-02-25',
      vote_average: 7.9,
      genre_ids: [18, 10749],
    },
    {
      id: 12,
      title: 'Película de Drama 3',
      overview: 'Descripción de la película de drama 3',
      poster_path: '/drama3.jpg',
      release_date: '2025-04-05',
      vote_average: 9.0,
      genre_ids: [18, 53],
    },
  ],
};

// Mock movie details
export const mockMovieDetails = {
  '1': {
    id: 1,
    title: 'Película Trending 1',
    original_title: 'Trending Movie 1',
    overview: 'Descripción detallada de la película trending 1. Esta es una descripción más larga para mostrar los detalles completos de la película en la página de detalles.',
    poster_path: '/poster1.jpg',
    backdrop_path: '/backdrop1.jpg',
    release_date: '2025-01-15',
    vote_average: 8.5,
    runtime: 142,
    budget: 180000000,
    revenue: 950000000,
    genres: [
      { id: 28, name: 'Acción' },
      { id: 878, name: 'Ciencia ficción' },
    ],
    production_companies: [
      { id: 101, name: 'Productora Ejemplo 1' },
      { id: 102, name: 'Productora Ejemplo 2' },
    ],
  },
  '4': {
    id: 4,
    title: 'Película de Acción 1',
    original_title: 'Action Movie 1',
    overview: 'Descripción detallada de la película de acción 1. Esta es una descripción más larga para mostrar los detalles completos de la película en la página de detalles.',
    poster_path: '/action1.jpg',
    backdrop_path: '/actionbackdrop1.jpg',
    release_date: '2025-01-05',
    vote_average: 7.5,
    runtime: 128,
    budget: 120000000,
    revenue: 550000000,
    genres: [
      { id: 28, name: 'Acción' },
      { id: 12, name: 'Aventura' },
    ],
    production_companies: [
      { id: 103, name: 'Productora Ejemplo 3' },
    ],
  },
  '7': {
    id: 7,
    title: 'Película de Comedia 1',
    original_title: 'Comedy Movie 1',
    overview: 'Descripción detallada de la película de comedia 1. Esta es una descripción más larga para mostrar los detalles completos de la película en la página de detalles.',
    poster_path: '/comedy1.jpg',
    backdrop_path: '/comedybackdrop1.jpg',
    release_date: '2025-01-10',
    vote_average: 7.2,
    runtime: 115,
    budget: 45000000,
    revenue: 320000000,
    genres: [
      { id: 35, name: 'Comedia' },
      { id: 10749, name: 'Romance' },
    ],
    production_companies: [
      { id: 104, name: 'Productora Ejemplo 4' },
      { id: 105, name: 'Productora Ejemplo 5' },
    ],
  },
  '10': {
    id: 10,
    title: 'Película de Drama 1',
    original_title: 'Drama Movie 1',
    overview: 'Descripción detallada de la película de drama 1. Esta es una descripción más larga para mostrar los detalles completos de la película en la página de detalles.',
    poster_path: '/drama1.jpg',
    backdrop_path: '/dramabackdrop1.jpg',
    release_date: '2025-01-15',
    vote_average: 8.7,
    runtime: 156,
    budget: 90000000,
    revenue: 480000000,
    genres: [
      { id: 18, name: 'Drama' },
      { id: 36, name: 'Historia' },
    ],
    production_companies: [
      { id: 106, name: 'Productora Ejemplo 6' },
    ],
  },
};

// Mock search results
export const mockSearchResults = [
  {
    id: 101,
    title: 'Película de Búsqueda 1',
    overview: 'Descripción de la película de búsqueda 1',
    poster_path: '/search1.jpg',
    release_date: '2025-01-20',
    vote_average: 7.3,
    genre_ids: [28, 12],
  },
  {
    id: 102,
    title: 'Película de Búsqueda 2',
    overview: 'Descripción de la película de búsqueda 2',
    poster_path: '/search2.jpg',
    release_date: '2025-02-10',
    vote_average: 6.8,
    genre_ids: [35, 10749],
  },
  {
    id: 103,
    title: 'Película de Búsqueda 3',
    overview: 'Descripción de la película de búsqueda 3',
    poster_path: '/search3.jpg',
    release_date: '2025-03-15',
    vote_average: 8.2,
    genre_ids: [18, 53],
  },
  {
    id: 104,
    title: 'Otra Película',
    overview: 'Descripción de otra película',
    poster_path: '/search4.jpg',
    release_date: '2025-04-05',
    vote_average: 7.5,
    genre_ids: [27, 9648],
  },
];
