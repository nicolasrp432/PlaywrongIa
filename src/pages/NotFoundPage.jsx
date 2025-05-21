import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

/**
 * NotFoundPage component - Displayed when a route doesn't exist
 */
const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16 text-center">
        <h1 className="text-netflix-red text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Página no encontrada</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          La página que estás buscando no existe o ha sido movida a otra ubicación.
        </p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
