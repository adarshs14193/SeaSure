import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactUs from '@/components/ContactUs'

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <ContactUs/>
      </main>
      <Footer/>
    </div>
  )
}

export default Contact