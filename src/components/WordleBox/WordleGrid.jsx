import React from 'react';

export default function WordleGrid({guessLetters=[],maxTries,maxLength}) {
  return <div className="w-full grid grid-cols-5 gap-1">
      {Array.from(new Array(maxLength * maxTries), (_, idx) => {
          return <div key={idx} className={
            "word-border font-bold rounded flex justify-center items-center  uppercase"+
          (guessLetters[idx]?.state === 'success' ? " bg-green-600" : '' )+
          (guessLetters[idx]?.state === 'warn' ? " bg-yellow-700" : '' )+
          (guessLetters[idx]?.state === 'error' ? " bg-zinc-800" : '' )
        }>{guessLetters[idx]?.letter}</div>
        })}
  </div>;
}
