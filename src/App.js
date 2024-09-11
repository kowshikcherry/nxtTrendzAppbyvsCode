import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import LoginForm from "./components/LoginForm";
import Home from './components/Home'
import Products from './components/Products'
import ProductParamsWrapper from "./components/ProductParamsWrapper";
import Cart from './components/Cart'
import NotFound from "./components/NotFound"
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from './context/CartContext'



const App = () => {
  const [cartList , setCartList]=useState([])
  // const [isAuthenticated, setIsAuthenticated] = useState(false);



  const addCartItem=(product)=>{
    const cartListIds=cartList.map(i=>i.id)

    if (cartListIds.includes(product.id)){
      const updatedCartlist=cartList.map(i=>{
        if (i.id===product.id){
          return {...i,quantity:i.quantity+product.quantity}
        }else{
          return {...i}
        }
      })
      setCartList([...updatedCartlist])
    }else{
      setCartList([...cartList,product])
    }
  }
  
  const removeCartItem=(id)=>{
    const filtercartLists=cartList.filter(i=>i.id!==id)
    setCartList(filtercartLists)
  }

  const incrementCartItemQuantity=(id)=>{
    const filtercartLists=cartList.map(i=>{
      if (i.id===id){
        return {...i,quantity:i.quantity+1}
      }else{
        return {...i}
      }
    })
    setCartList(filtercartLists)
  }

  const decrementCartItemQuantity=(id)=>{
    const quentityBased=cartList.filter(i=>i.id===id)
    if (quentityBased[0].quantity===1){
      removeCartItem(id)
    }else{
      const filtercartLists=cartList.map(i=>{
        if (i.id===id){
          return {...i,quantity:i.quantity-1}
        }else{
          return {...i}
        }
      })
      setCartList(filtercartLists)
    }
  }

  const removeAllCartItems=()=>setCartList([])

  // const checkAuthentication = () => {
  //   const token = Cookies.get('jwt_token');
  //   setIsAuthenticated(!!token); // Update state based on whether the token exists
  // }

  // const token = Cookie.get('jwt_token');


  // const isAuthenticated = token===undefined


  return (
    <CartContext.Provider
        value={{
          cartList,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeAllCartItems,
        }}
      >
  <Router>
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductParamsWrapper />} />
          {/* Additional protected routes can go here */}
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to='/not-found' />} />
      </Routes>
    </Router>
    </CartContext.Provider>
  )
}

export default App


/*
isAuthenticated? <Navigate to='/' replace />: <LoginForm />

<ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/products/:id"
          component={ProductItemDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Navigate to="/not-found" replace />

*/