import React,{ useCallback, useEffect } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import WordleGrid from './WordleGrid';


export default function WordleBox({wordLength,maxGuesses,solution,listOfsolutions,currentDay}) {
    console.log(solution);
    console.log(listOfsolutions);
    const max_length = wordLength;
    const [day, setDay] = React.useState(localStorage.getItem('day') || null);
    const [current_guesses, setCurrentGuesses] = React.useState(localStorage.getItem('current_guesses') || 0);
    const [word, setWord] = React.useState(localStorage.getItem('word') || '');
    const [letters, setLetters] = React.useState(JSON.parse(localStorage.getItem('letters')) || []);
    const [state, setState] = React.useState(localStorage.getItem('state') || null);
    const [isGameLose, setLose] = React.useState(localStorage.getItem('isGameLose') || false);
    const [isGameWon, setWin] = React.useState(localStorage.getItem('isGameWon') || false);
    
    useEffect(() => {
        localStorage.setItem('word', word);
        localStorage.setItem('letters', JSON.stringify(letters));
        localStorage.setItem('state', state);
        localStorage.setItem('current_guesses', current_guesses);
        localStorage.setItem('isGameLose', isGameLose);
        localStorage.setItem('isGameWon', isGameWon);
        localStorage.setItem('day', day);
    }, [word, letters, state, current_guesses, isGameLose, isGameWon,day]);

    const checkGuess = useCallback(() => {
        if(isGameWon || isGameLose) return;
        if(word.length < 5) return;
        if(word === solution){
            setLetters([...letters,...word.split("").map((letter) => ({state:'success', letter })),]);
            setWin(true);
            setCurrentGuesses(current_guesses + 1);
            setDay(currentDay);
            setWord("");
            if (currentDay !== day) {
                localStorage.clear();
            }
        }else{
            if(current_guesses === maxGuesses+1){ 
                setLose(true);
                setDay(currentDay);
                setWord("");
                if (currentDay !== day) {
                    localStorage.clear();
                }
            }else{
                if (!!!listOfsolutions[1].includes(word)) {
                    alert("Esa palabra no existe en el diccionario");
                    return;
                }              
                setLetters([...letters,...word.split("").map((letter, idx) => {
                    if (solution[idx] === letter) {
                        return {state:'success', letter };
                    }
                    if (solution.indexOf(letter) >= 0 && word[solution.indexOf(letter)] !== letter) {
                    return {state:'warn', letter };
                    }
                    return {state:'error', letter };
                }),]);
                setCurrentGuesses(current_guesses + 1);
                setWord("");
            }
        }
    },[word, letters,solution,isGameLose,isGameWon,current_guesses,maxGuesses,listOfsolutions,currentDay,day]);
    
    const addWordToGuess = useCallback((letterPressed) => {
        if(isGameWon || isGameLose) return;
        if (letterPressed === 'Borrar'){ 
            setWord(word.slice(0, -1));
        } else if (letterPressed === 'Enviar'){
            if(word.length <5) return;            
            checkGuess();
        }else{
            setState(null);
            if(word.length===max_length) return;
            setWord(word + letterPressed);
        }
    },[checkGuess, max_length, word,isGameLose,isGameWon]);
    
    return (<>
        <div className='w-1/2'>
            <WordleGrid maxLength={wordLength} maxTries={maxGuesses} guessLetters={[...letters,...word.split("").map((letter) => ({ state, letter })),]}/>
        </div>
        <div className='w-2/3'>
            <Keyboard letters={letters} onKeyPress={addWordToGuess} onEnter={checkGuess} onBackspace={() => setWord(word.slice(0, -1))}/>
        </div>
    </>);
}
