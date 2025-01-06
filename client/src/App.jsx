import Navbar from './Components/Navbar'
import Home from './screens/Home'
import Menu from './screens/Menu'
import { Route,Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import LoginPage from './screens/Login'
import SignUpPage from './screens/Signup'
import Cart from './screens/cartScreens'
import OrdersScreen from './screens/OrdersScreen'
import Adminscreen from './screens/Adminscreen'
function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/menu" exact element={<Menu />} />
          <Route path='/login' exact element={<LoginPage/>}/>
          <Route path="/cart" exact element={<Cart/>}/>
          <Route path="/orders" exact element={<OrdersScreen/>}/>
          <Route path="/signup" exact element={<SignUpPage/>}/>
          <Route path="/admin/*" element={<Adminscreen/>}/>
      </Routes>
      <Footer></Footer>
      
    </>
  )
}

export default App
