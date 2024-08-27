import { useState, useCallback, useEffect,useRef } from "react";
//useRef: if you want any thing reference from dom 
//useCallback memorization the function
function PassWordGenrator() {
  const [length, setLength] = useState(9);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const clickToDashbord=useCallback(()=>{
    passRef.current?.select();

window.navigator.clipboard.writeText(password);
  },[password])
  const passGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+=-[]";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passGenrator();
  }, [length, numberAllowed, charAllowed, setPassword]);
const passRef=useRef(null)
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-20 py-10 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-100xl text-center text-red-500">Hello</h1>
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          className="w-full p-2" ref={passRef}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" 
        onClick={clickToDashbord}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
             ref={passRef}
           />
          <label>Length {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox" defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default PassWordGenrator;
