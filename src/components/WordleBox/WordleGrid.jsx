import React from 'react';

export default function WordleGrid({guessLetters=[],maxTries,maxLength}) {
  return <div className="grid grid-cols-5 gap-1">
      {Array.from(new Array(maxLength * maxTries), (_, idx) => {
          return <div key={idx} className={
            "flex-1 word-border font-bold text-xs h-14 rounded flex justify-center items-center  uppercase "+
          (guessLetters[idx]?.state === 'success' ? " bg-green-500" : '' )+
          (guessLetters[idx]?.state === 'warn' ? " bg-yellow-600" : '' )+
          (guessLetters[idx]?.state === 'error' ? " bg-gray-500" : '' )
        }><span>{guessLetters[idx]?.letter}</span></div>
        })}
  </div>;
}
