import React from 'react';
import './Awards.css';

interface AwardWinner {
  id: number;
  name: string;
  product: string;
  image: string;
  description: string;
  prize: string;
}

const awardWinners: AwardWinner[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    product: "Hand-carved Wooden Sculptures",
    image: "https://i.pinimg.com/736x/10/5b/a0/105ba04293d991a7c57e46c20dd655da.jpg",
    description: "Creating breathtaking wooden masterpieces that bring nature's beauty into homes. Her intricate detail work has captured hearts worldwide.",
    prize: "1,00,000"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    product: "Ceramic Art Pieces",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Potter_at_work%2C_Jaura%2C_India.jpg",
    description: "Blending traditional techniques with modern designs, Miguel's ceramic works tell stories of cultural heritage and contemporary art.",
    prize: "75,000"
  },
  {
    id: 3,
    name: "Emma Chen",
    product: "Handwoven Textiles",
    image: "https://assets.vogue.in/photos/5f2d196093fbd755fe1ac37e/1:1/w_1365,h_1365,c_limit/Weaver%20Vijayamma%20J,%20Age%2062%20years%20-%20Pic%20Dinesh%20Madhavan%20for%20SaveTheLoom.jpg",
    description: "Revolutionizing textile art with sustainable materials and innovative patterns that celebrate diversity in craftsmanship.",
    prize: "50,000"
  }
];

export const Awards = () => {
  return (
    <section className="awards-section">
      <h2 className="awards-title">Excellence in Artisanship Awards</h2>
      <p className="awards-subtitle">
        Celebrating the finest craftspeople who bring extraordinary beauty to everyday life
      </p>

      <div className="award-grid">
        {awardWinners.map((winner) => (
          <div key={winner.id} className="award-card">
            <img 
              src={winner.image} 
              alt={winner.name}
              className="award-image"
            />
            <div className="award-info">
              <h3>{winner.name}</h3>
              <h4>{winner.product}</h4>
              <p>{winner.description}</p>
              <div className="prize">
                Prize Amount: {winner.prize}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inspiration">
        <h3>Join Our Creative Community</h3>
        <p>
          These exceptional artisans showcase the pinnacle of craftsmanship and creativity.
          Their dedication to their craft inspires us all to pursue excellence and innovation
          in our own work. Want to be part of next year's awards? Start creating today!
        </p>
      </div>
    </section>
  );
};
