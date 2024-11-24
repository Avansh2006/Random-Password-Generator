import { useState,useEffect,useRef } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    document.title = "Random Password Gen"; 
  }, []);
  
  const [chars, setchars] = useState(7);
  const [nums, setnums] = useState(false);
  const [special, setspecial] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  let handleChange = (event) => {
    setchars(event.target.value);
  };

  let toggleNums = () => {
    setnums((prev) => !prev);
  };

  let toggleSpecial = () => {
    setspecial((prev) => !prev);
  };

  function generateRandomPassword(chars) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (nums) characters += '0123456789'; 
    if (special) characters += '!@#$%^&*()_+[]{}|;:,.<>?'; 

    let password = '';
    for (let i = 0; i < chars; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  const handleGenerate = () => {
    const newPassword = generateRandomPassword(chars);
    setPassword(newPassword); 
  };

  useEffect(() => {
    handleGenerate(); 
  }, [chars,nums,special]);

  const copyFn =()=>{
    navigator.clipboard.writeText(password);
    passwordRef.current.select(); 
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen font-sans text-white">
      <div className="w-11/12 p-8 text-gray-800 bg-white rounded-lg shadow-lg md:w-3/4">
        <h1 className="mb-6 text-3xl font-bold text-center">Password Generator</h1>

        <div className="mb-4">
          <input
            type="text"
            readOnly
            ref={passwordRef}
            value={password}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
          />
          <button
            className="w-full px-4 py-2 mt-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            onClick={copyFn}
          >
            Copy Password
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Character Count: <span className="font-bold">{chars}</span>
            </label>
            <input
              type="range"
              min={4}
              max={21}
              value={chars}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={nums}
              onChange={toggleNums}
              className="mr-2"
            />
            <label className="text-sm font-medium">Include Numbers</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={special}
              onChange={toggleSpecial}
              className="mr-2"
            />
            <label className="text-sm font-medium">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;