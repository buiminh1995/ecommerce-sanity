import React from 'react'
import Head from 'next/head'
import Navbar from './NavBar'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>My ecommerce website</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout