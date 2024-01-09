import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        AP
      </div>
      <nav className="navigation">
        <a href="#about" className="nav-link">About</a>
        <a href="#portfolio" className="nav-link">Portfolio</a>
        <a href="#blog" className="nav-link">Blog</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
      <div className="social-media">
        <a href="https://twitter.com" className="social-link">Twitter</a>
        <a href="https://linkedin.com" className="social-link">LinkedIn</a>
        <a href="https://facebook.com" className="social-link">Facebook</a>
        <a href="https://instagram.com" className="social-link">Instagram</a>
      </div>
    </header>
  );
};

export default Header;
