import React from 'react'
import Hearder from './Hearder';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div >
      <main>
        <Hearder />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout