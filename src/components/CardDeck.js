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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDeck(shuffleDeck(generateDeck()));
    setCurrentIndex(0); //reset top card
  }, []);


  //handle next card click:
  const handleNextCard = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //handle reshuffle button click:
  const handleReshuffle = () => {
    setDeck(shuffleDeck(generateDeck()));
    setCurrentIndex(0); //reset to top card
  };

  //image load errors
  const handleImageError = (e, card) => {
    console.error(`Failed to load image: ${card.image}`);
    e.target.alt = 'Image not found';
  };

  //get current card (or null if deck is empty)
  const currentCard = deck.length > 0 ? deck[currentIndex] : null;

  return (
    <div className="card-deck-container">
      <h1>Shuffled Deck of Cards</h1>
      <div className="card-display">
        {currentCard ? (
          <div className="card">
            <img
              src={currentCard.image}
              alt={`${currentCard.rank} of ${currentCard.suit}`}
              className="card-image"
              onError={(e) => handleImageError(e, currentCard)}
            />
          </div>
        ) : (
          <p>No cards available</p>
        )}
      </div>
      <div className="button-container">
        {currentIndex < deck.length - 1 ? (
          <button onClick={handleNextCard}>Next Card</button>
        ) : (
          <button onClick={handleReshuffle}>Reshuffle</button>
        )}
      </div>
    </div>
  );
};

export default CardDeck;