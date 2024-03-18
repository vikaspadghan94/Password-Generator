import { useState , useCallback , useEffect, useRef} from 'react'

// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed)   str += "!@#$%&*^%^&*"
    

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password) // copy to keyboard
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
   <div className='w-full max-w-md mx-auto text-center shadow-md rounded-lg px-4 py-3 pb-8 my-8 bg-gray-800 text-orange-500'><h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className=' flex className="flex shadow rounded-lg overflow-hidden mb-4"'>
      <input 
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={copyPassword}
       className='outline-none bg-blue-700 text-white px-3 py-1.5 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out'>copy</button>
    </div>

<div className='flex text-5m gap-x-2'>
  <div className='flex items-center gap-x-1'>
<input 
type="range"
min={6}
max={40}
value={length}
className='cursor-pointer'
onChange={(e) => {setLength(e.target.value)}}
  />
  <label> Length:{length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked= {numberAllowed}
    id="numberInput"
    onChange={() => {
      setNumberAllowed((prev) => 
      !prev)
    }}
    />
    <label htmlFor="numberInput"> Numbers</label>
  </div>

  <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked= {charAllowed}
    id="charecterInput"
    onChange={() => {
      setCharAllowed((prev) => 
      !prev)
    }}
    />
    <label htmlFor="numberInput"> Charecters</label>
  </div>
   </div>
   </div>
    </>
  )
}

export default App
