import React, {useState} from 'react'

function FlashCard({flashCard}) {
    const [flip, setFlip] = useState(false)
    return (
        <div className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>

            {/* Front Section of Card */}
            <div className="front">
                {flashCard.question}
                <div className="flashcard-options">
                    {flashCard.options.map(option => (
                        <div className="flashcard-option">{option}  </div>
                    ))}
                </div>
            </div>

                            {/* Back Section of Card */}
            <div className="back"> {flashCard.answer} </div>
            {/* {flip ? flashCard.answer : flashCard.question} */}
        </div>
    )
}

export default FlashCard
