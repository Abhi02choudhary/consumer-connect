import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuBar from './pages/Menubar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MenuBar/> 
    </>
  )
}

export default App