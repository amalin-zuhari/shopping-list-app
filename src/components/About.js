import React from 'react';
import '../Styles/About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="left-section">
                <h1>Experience a new way to shop with <span className="easytext">EasyShop</span></h1>
                <p style={{ textAlign: 'justify' }}>EasyShop is your one-stop solution for managing shopping lists, browsing shops, and adding items to your cart. Keep track of everything you need and streamline your shopping experience—all in one place.</p>
            </div>
            <div className="right-section">
                <div className="image-container">
                    <img 
                        src={process.env.PUBLIC_URL + '/images/About.jpg'} 
                        alt="EasyShop App Preview" 
                        className="app-preview"
                    />
                    <div className="gradient-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default About;
