import React,{useState, useEffect} from 'react';
import FlashCardList from './components/FlashCardList';
import Axios from 'axios';
import './app.css'

function App() {
  const API_URL = "https://opentdb.com/api.php?amount=10"
  const [flashCards, setFlashCards] = useState(SAMPLE_QUESTIONS)


  // Setting up UseEffect
  useEffect(() => {
    Axios
    .get(API_URL)
    .then(res => {
      res.data.results.map((questionItem,index) => {
        return {
          id: `${index}-${Date.now()}`,
          questions: questionItem.question,
          
        }
      })
    })
  }, [])
  return (
    <>
      <FlashCardList flashCards={flashCards} />
    </>
  );
}


const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "What is 2+2",
    answer: 4,
    options:['2','3','4','5']
  },
  {
    id: 2,
    question: "What is 7+7",
    answer: 14,
    options:['12','13','14','15']
  }
]

export default App;
