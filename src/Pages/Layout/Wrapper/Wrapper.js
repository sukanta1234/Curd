import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Wrapper = ({children}) => {
  return (
  <>
  <Header/>
  {children}
  <Footer/>

  </>
  )
}

export default Wrapper
