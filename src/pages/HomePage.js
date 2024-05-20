import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../styles/HomePage.css';

function HomePage() {
    const clothes = [
        { src: 'path/to/clothing1.jpg', alt: 'Recycled cotton T-shirt' },
        { src: 'path/to/clothing2.jpg', alt: 'Recycled polyester dress in forest green' },
        { src: 'path/to/clothing3.jpg', alt: 'Upcycled denim jacket' },
        // Add more clothes as needed
    ];

    return (
        <div className="home-page">
            <header className="header">
                <h1>ExtendedUse</h1>
                <p>We make clothing from recycled materials for a greener future.</p>
            </header>

            <section className="image-gallery">
                <h2>Shop Our Recycled Styles</h2>
                <div className="clothing-grid">
                    {clothes.map((cloth) => (
                        <img key={cloth.src} src={cloth.src} alt={cloth.alt} />
                    ))}
                </div>
            </section>

            <section className="call-to-action">
                <h3>Dress Sustainably</h3>
                <Link to="/products" className="shop-now-button">Shop Now</Link> {/* Link to products page */}
            </section>
        </div>
    );
}

export default HomePage;

