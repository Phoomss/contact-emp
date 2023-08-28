import React from 'react'
import Hearder from './Hearder';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '60vh' }}>
      <Hearder />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout