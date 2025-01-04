import Navbar from './Components/Navbar'
import Home from './screens/Home'
import Menu from './screens/Menu'
import { Route,Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import LoginPage from './screens/Login'
import SignUpPage from './screens/Signup'
import Cart from './screens/cartScreens'
function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
      <Footer></Footer>
      
    </>
  )
}

export default App
