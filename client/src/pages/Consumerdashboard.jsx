import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ConsumerDashboard from '@/components/dashboard/ConsumerDashboard'

const Consumerdashboard = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <ConsumerDashboard/>
      </main>
      <Footer/>
    </div>
  )
}

export default Consumerdashboard