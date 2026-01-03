import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LandingPage from '@/screens/LandingPage'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <LandingPage/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home