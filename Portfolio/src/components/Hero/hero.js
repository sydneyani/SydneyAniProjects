import React from 'react';
import './hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="designer">
                    <h1>Designer</h1>
                    <p>Product designer specializing in UI design and design systems.</p>
                </div>
                <div className="coder">
                    <h1>Coder</h1>
                    <p>Front-end developer who writes clean, elegant, and efficient code.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
