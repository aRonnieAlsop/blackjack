import { useState, useEffect } from 'react';
import './CardDeck.css';

//suits and ranks: 
const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

//deck generation:
const generateDeck = () => {
  const deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ 
        suit, 
        rank,
        image: '/assets/cards/${suit}/${rank}.jpg'
     });
    });
  });
  return deck;
};

//shuffle w/ Math.random:
const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }     
  return shuffledDeck;
};

const CardDeck = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck(shuffleDeck(generateDeck()));
  }, []);

  //handle reshuffle button click:
  const handleReshuffle = () => {
    setDeck(shuffleDeck(generateDeck()));
  };

   return (
    <div className="card-deck-container">
      <h1>Shuffled Deck of Cards</h1>
      <button onClick={handleReshuffle}>Reshuffle</button>
      <div className="card-grid">
        {deck.map((card, index) => (
          <div key={`${card.suit}-${card.rank}-${index}`} className="card">
            <img
              src={card.image}
              alt={`${card.rank} of ${card.suit}`}
              className="card-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDeck;