import React from 'react'
import FlashCard from './FlashCard'

function FlashCardList({ flashCards}) {
    return (
        <div className="card-grid">
            {flashCards.map((flashCard) => (
                <FlashCard key={flashCard.id} flashCard={flashCard} />
            ))}
        </div>
    )
} 

export default FlashCardList
