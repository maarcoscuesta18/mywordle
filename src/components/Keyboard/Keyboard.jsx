import React, {useEffect} from 'react';

export default function Keyboard({onKeyPress,onEnter,onBackspace,letters = []}) {
    //qwerty spain keyboard
    const keys =[
        ["q","w","e","r","t","y","u","i","o","p"],
        ["a","s","d","f","g","h","j","k","l","ñ"],
        ["Enviar","z","x","c","v","b","n","m","Borrar"]
    ];
    //use effect to add real keyboad event listener
    useEffect(() => {
        function onKeyup(event) {
          if (event.key === "Enter") onEnter();
          if (event.key === "Backspace") onBackspace();
          if (keys.flat().includes(event.key)) onKeyPress(event.key);
        }
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener("keyup", onKeyup);
      });
    // go through keyboard keys and render each key
    return <div className="w-full mt-10 mb-8">
        {keys.map((row) => {
            return <div className="flex w-full gap-1" key={row}>
                {row.map((key) => {
                    return <button key={key} onClick={() => onKeyPress(key)} className={"flex-1 keyboard-button font-bold text-xs h-14 rounded flex justify-center items-center mb-2 uppercase"+          
                        (letters.filter(({ letter }) => letter === key).map(({ state }) => state).sort()[0] === 'success' ? " bg-green-500" : '' )+
                    (letters.filter(({ letter }) => letter === key).map(({ state }) => state).sort()[0] === 'warn' ? " bg-yellow-600" : '' )+
                    (letters.filter(({ letter }) => letter === key).map(({ state }) => state).sort()[0] === 'error' ? " bg-gray-500" : '' )}>{key}</button>
                })}
            </div>
        })}        
    </div>;
}
