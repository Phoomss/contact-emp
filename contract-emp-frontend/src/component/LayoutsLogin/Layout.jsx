import React from 'react'
import Hearder from './Hearder';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    < >
      <Hearder />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default Layout