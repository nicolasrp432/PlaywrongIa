import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Navbar component with authentication controls and search functionality
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    const returnUrl = `${window.location.origin}`;
    logout({
      logoutParams: {
        returnTo: returnUrl
      }
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-netflix-red text-3xl font-bold">PlaywrongIA</span>
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="hidden md:flex mx-4 flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar películas..."
              className="w-full px-4 py-2 bg-netflix-dark-gray text-white rounded-full focus:outline-none focus:ring-2 focus:ring-netflix-red"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Authentication Controls */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center">
              <div className="hidden md:block mr-4">
                <span className="text-white">Hola, {user?.name || 'Usuario'}</span>
              </div>
              <img
                src={user?.picture || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm py-1 px-3"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="btn-primary"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search (only visible on small screens) */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Buscar películas..."
            className="w-full px-4 py-2 bg-netflix-dark-gray text-white rounded-l-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-netflix-red px-4 rounded-r-full text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
