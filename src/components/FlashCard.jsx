import React, {useState,useEffect,useRef} from 'react'

function FlashCard({flashCard}) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial')



    // Setting up useRef
    const frontEl = useRef();
    const backEl = useRef();

    // Setting up function to set Max height
    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
      
    }

    // Setting up useEffect to adjust the height of the card
    useEffect(setMaxHeight, [flashCard.question, flashCard.answer, flashCard.options]);

    useEffect(() => {
      window.addEventListener("resize", setMaxHeight);
      return () => {
        window.removeEventListener("resize", setMaxHeight);
      };
    }, []);
    
    return (
        <div style={{height: height}} className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>

            {/* Front Section of Card */}
            <div className="front" ref={frontEl}>
                {flashCard.question}
                <ol type="a" className="flashcard-options">
                    {flashCard.options.map(option => (
                        <li key={option} className="flashcard-option">{option}  </li>
                    ))}
                </ol>
            </div>

                            {/* Back Section of Card */}
            <div className="back" ref={backEl}> {flashCard.answer} </div>
            {/* {flip ? flashCard.answer : flashCard.question} */}
        </div>
    )
}

export default FlashCard
