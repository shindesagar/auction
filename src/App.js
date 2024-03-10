import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import AddProduct from './pages/AddProduct'
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import PaymentPage from './pages/PaymentPage';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
function App() {
 return (
    <>
      <Header/>
      <Routes>
        <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/product" element={<AddProduct/>} />
            <Route path="/make-payment" element={<PaymentPage/>}/>
        </Route>
        <Route element={<Home/>} path="/" />
        <Route element={<NotFound/>} path="*" />
        <Route element={<PaymentFailed/>} path="/payment-failed" />
        <Route element={<PaymentSuccess/>} path="/payment-success" />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails/>}/>
      </Routes>
      <Footer/>
      
    </>
  );
}

export default App;
