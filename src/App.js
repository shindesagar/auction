import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import AddProduct from './pages/AddProduct'
import AuthUser from './components/auth/AuthUser';
import ProductDetails from './components/ProductDetails';

function App() {
 const {getToken} = AuthUser();
  if(!getToken()){
    return <Login />
  }
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product" element={<ProtectedRoute component={AddProduct} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails/>}/>
      </Routes>
    </>
  );
}

export default App;
