import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import HeroSection from './pages/HeroSection'
import TrustedCompanies from './pages/TrustedCompanies'
import LiveStatistics from './pages/LiveStatistics'
import AutoScrollCarousel from './pages/AutoScrollCarousel'
import Footer from './pages/Footer'
import HeroSection from './pages/H-Section'
import ExpandingCard from './pages/ExpandingCard'
import Navbar from './pages/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <HeroSection />  
      <ExpandingCard />
     {/* <FloatingCards /> */}

     <TrustedCompanies />
     <LiveStatistics />
     <AutoScrollCarousel />
     <Footer />

    </>
  )
}

export default App