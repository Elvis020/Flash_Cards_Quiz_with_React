import React,{useState, useEffect, useRef} from 'react';
import FlashCardList from './components/FlashCardList';
import Axios from 'axios';
import './app.css'

function App() {
  const [flashCards, setFlashCards] = useState([])
  const [categories, setCategories] = useState([])

  // Setting up useRef for Caegory
  const categoryEl = useRef()
  const amountEl = useRef()


  // Setting up useEffect frol getting the category of questions
  useEffect(() => {
    Axios
    .get("https://opentdb.com/api_category.php")
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])



  // Setting up UseEffect fro getting 10 question
  useEffect(() => {
    
  }, [])

  // Function to decode incoming data
  const decodeString = (str) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }


  // Form for submission
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .get("https://opentdb.com/api.php", {params:{
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }})
      .then(res => {
        setFlashCards(res.data.results.map((questionItem, index) => {
          const correctAnswer = decodeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), correctAnswer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: correctAnswer,
            options: options.sort(() => Math.random - .5)

          }
        }))
      })
  }


  return (
    <>
    <form className="header" onSubmit={handleSubmit}>

      {/* Categories */}
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}> {category.name} </option>
          })}
        </select>
      </div>

      {/* Number of Question */}
      <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
      </div>
      

      <div className="form-group">
        <button className="btn" >Generate</button>
      </div>
    </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}




export default App;
