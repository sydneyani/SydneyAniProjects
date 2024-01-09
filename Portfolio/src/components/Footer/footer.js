import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Your Name or Brand</p>
                <nav className="footer-nav">
                    <a href="#about" className="footer-link">About</a>
                    <a href="#portfolio" className="footer-link">Portfolio</a>
                    <a href="#blog" className="footer-link">Blog</a>
                    <a href="#contact" className="footer-link">Contact</a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
