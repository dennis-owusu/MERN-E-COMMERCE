import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import SinglePage from "./pages/SinglePage"

function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path={`/single-page/:productId`} element={<SinglePage/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
    <FooterComp/>
    </BrowserRouter>
    <ToastContainer/>
    </>
    
  )
}

export default App
