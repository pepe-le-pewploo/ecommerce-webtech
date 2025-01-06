import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminFeatures from './pages/admin-view/AdminFeatures'
import AdminOrders from './pages/admin-view/AdminOrders'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/ShoppingAccount'
import ShoppingHome from './pages/shopping-view/ShoppingHome'
import ShoppingCheckout from './pages/shopping-view/ShoppingCheckout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <h1>Ecommerece</h1>
      <Routes>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
        </Route>
        <Route path='/shop' element={<ShoppingLayout/>}>
          <Route path='account' element={<ShoppingAccount/>}/>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
 
    </div>
  )
}

export default App
