import axios from 'axios';
import './welcome.css';
import { useState, useEffect } from 'react';

const WelcomeSection = () => {

    const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const offers = [
        { 
            title: "Christmas Offer", 
            description: "Get 20% off on all products this Christmas!", 
            image: "https://images.news18.com/ibnlive/uploads/2022/01/happy-pongal-2022-wishes-images-greetings-english-hindi-tamil-5-16420110373x2.jpg" 
        },
        { 
            title: "Pongal Offer", 
            description: "Celebrate Pongal with special discounts!", 
            image: "https://i.pinimg.com/736x/3e/2c/cd/3e2ccd460216a06b3a2ed6ff01a5d406.jpg" 
        },
        { 
            title: "New Year Sale", 
            description: "Start the year with amazing deals!", 
            image: "https://c.ndtvimg.com/2022-01/l86uuaao_pongal_625x300_13_January_22.jpg?im=Resize=(1230,900)" 
        },
        { 
            title: "Spring Sale", 
            description: "Refresh your home with our Spring Sale!", 
            image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/01/Pongal-Harvest-Celebrations-in-South-India.jpg" 
        },
        { 
            title: "Summer Discounts", 
            description: "Enjoy summer with exclusive discounts!", 
            image: "https://www.mistay.in/travel-blog/content/images/2020/06/Pongal-cover-pic-7.jpg" 
        }
    ];

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/seller/get/banner/`);
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching products:', error);
        }
      }
      fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
        }, 5000); // Change offer every 5 seconds

        return () => clearInterval(interval);
    }, [offers.length]);

    const handleShowDetails = (offer) => {
        setSelectedOffer(offer);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOffer(null);
    };

    // Get the current set of offers to display
    const displayedOffers = products.slice(currentOfferIndex, currentOfferIndex + 3).concat(products.slice(0, Math.max(0, currentOfferIndex + 3 - products.length)));

    return (
        <>
        {loading ? <h1 className="welcome-loading">Loading...</h1> : 
        <div className="welcome-section-container">
            <div className="welcome-section">
                {/* <div className="welcome-content"> */}
                    <div className="welcome-title">Welcome to CraftVista</div>
                    
                    {products?.length > 0 ? (
                        <div className="welcome-banner">
                            {displayedOffers.map((offer, index) => (
                                <div key={index} className={`offer-item ${index === 0 ? 'active' : ''}`}>
                                <img 
                                    src={offer.image} 
                                    alt={offer.title} 
                                    className="offer-image" 
                                    onClick={() => handleShowDetails(offer)} // Open modal on image click
                                />
                                {/* <div className="offer-text">
                                    <p className="welcome-description">
                                        {offer.title}
                                    </p>
                                    <button onClick={() => handleShowDetails(offer)}>
                                        Show Details
                                    </button>
                                </div> */}
                            </div>
                        ))}
                    </div>
                    ) : ""}

                    <div className="welcome-description">
                        <p>Where rural artisans get a chance to showcase their products to the world, and connect with global buyers. And where you can find the best of Indian craftsmanship, all in one place.</p>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Innovation</h3>
                            <p>Blending traditional craftsmanship with modern design sensibilities.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Community</h3>
                            <p>Supporting artisans and their families through fair trade practices.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Global Reach</h3>
                            <p>Connecting local artisans to international markets and opportunities.</p>
                        </div>
                    </div>
                {/* </div> */}
            </div>

            {/* Modal for showing offer details */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedOffer?.title}</h2>
                        <p>{selectedOffer?.description}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
        }
        </>
    );
};

export default WelcomeSection;