import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component with links and copyright information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-netflix-black py-8 border-t border-netflix-light-gray mt-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-netflix-red text-2xl font-bold">PlaywrongIA</Link>
            <p className="text-gray-400 mt-2">
              Proyecto académico de desarrollo web frontend. Una aplicación de cartelera de películas
              inspirada en Netflix, utilizando React, Vite, Zustand y otras tecnologías modernas.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Inicio</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white transition">Búsqueda</Link></li>
              <li><a href="https://developer.themoviedb.org/docs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">API TMDB</a></li>
            </ul>
          </div>
          
          {/* Technologies */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Tecnologías</h3>
            <ul className="space-y-2">
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">React</a></li>
              <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Vite</a></li>
              <li><a href="https://zustand-demo.pmnd.rs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Zustand</a></li>
              <li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Tailwind CSS</a></li>
              <li><a href="https://auth0.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Auth0</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-netflix-light-gray text-center">
          <p className="text-gray-500">
            &copy; {currentYear} PlaywrongIA - Proyecto Académico. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Este proyecto utiliza la API de The Movie Database pero no está respaldado ni certificado por TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
