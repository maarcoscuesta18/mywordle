import React,{ useCallback, useEffect } from 'react';

import './App.css';
import WordleBox from './components/WordleBox/WordleBox';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

function getDayOfTheYear(){
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
}

function App() {
  const [solution, setSolution] = React.useState([]);

  async function getSolution() {
    var listOfWords = [];
    const response = await fetch("https://raw.githubusercontent.com/fvillena/palabras-diccionario-rae-completo/master/diccionario-rae-completo.txt");
    const text = await response.text();
    const words = text.split("\n");
    for (let i = 0; i < words.length; i++) {
      if (words[i].length === WORD_LENGTH) {
        listOfWords.push(words[i].replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").toLowerCase());
      }
    }
    return [listOfWords[Math.floor(Math.random()*listOfWords.length)],listOfWords];
  };
  const getSolutionCallback = useCallback(getSolution, []);
  useEffect(() => {
    if(getDayOfTheYear() !== parseInt(localStorage.getItem('day'))){
      getSolutionCallback().then(setSolution);
    }
  }, [getSolutionCallback]);

  if (getDayOfTheYear() !== parseInt(localStorage.getItem('day'))){
    localStorage.clear();
  }

  return (
    <div className="App">
      <main className="flex flex-col justify-center items-center w-full">
          <h1 className="uppercase font-bold text-4xl tracking-wider">WORDLE</h1>
          <WordleBox maxGuesses={MAX_GUESSES} wordLength={WORD_LENGTH} solution={solution[0]} listOfsolutions={solution} currentDay={getDayOfTheYear()}/>
      </main>
    </div>
  );
}

export default App;
