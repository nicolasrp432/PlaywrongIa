import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that wraps the entire application
 * Includes Navbar and Footer
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
