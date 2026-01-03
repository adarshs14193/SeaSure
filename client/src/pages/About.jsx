import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutPage from '../components/AboutPage'

const About = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <AboutPage/>
      </main>
      <Footer/>
    </div>
  )
}

export default About