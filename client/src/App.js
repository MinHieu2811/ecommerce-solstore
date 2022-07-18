import { BrowserRouter as Router, Route } from 'react-router-dom';
import BackToTop from './components/backToTop/BackToTop';
import Header from './components/header/Header';
import Category from './pages/category/Category';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import Profile from './pages/profile/Profile';
import ProductPages from './pages/productPage/productPages';
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shippingAddress/Shipping';
import UserList from './pages/admin/UserList';
import AuthVerify from './utils/AuthVerify';
import { logout } from './actions/userActions'
import { useDispatch } from 'react-redux';
import OrderList from './pages/admin/OrderList';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import UserEdit from './pages/admin/UserEdit';
import OrderEdit from './pages/admin/OrderEdit';
import WishListPage from './pages/wishlistPage/WishListPage';
import { AnimatePresence } from 'framer-motion';
import CustomRoute from './components/CustomRoute';
import PageNotFound from './pages/notFound/PageNotFound';

const Animated = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <CustomRoute>
          <Route path='/admin/userlist' element={<UserList />} />
          <Route path='/admin/productlist' element={<ProductList />} />
          <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
          <Route path='/admin/user/:id/edit' element={<UserEdit />} />
          <Route path='/admin/order/:id/edit' element={<OrderEdit />} />
          <Route path='/order/:id' element={<OrderEdit />} />
          <Route path='/admin/productlist/:pageNumber' element={<ProductList />} />
          <Route path='/admin/orderlist' element={<OrderList />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/wishlist' element={<WishListPage />} />
          <Route path='/checkout' element={<Shipping />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<SignUp />} /> 
          <Route path='/category' element={<Category />}/>
          <Route path='/category/page/:pageNumber' element={<Category />}/>
          <Route path='/category/search/:keyword' element={<Category />}/>
          <Route path='/category/search/:keyword/page/:pageNumber' element={<Category />}/>
          <Route path='/category/filter/:filter' element={<Category />}/>
          <Route path='/category/filter/:filter/page/:pageNumber' element={<Category />}/>
          <Route path='/category/sort/:sorting' element={<Category />}/>
          <Route path='/category/sort/:sorting/page/:pageNumber' element={<Category />}/>
          <Route path='/category/:id' element={<ProductPages />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
        </CustomRoute>
    </AnimatePresence>
  )
}

function App() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout())
  }
  return (
    <>
      <Router>
        <Header />
        <BackToTop />
        <div className='symbols'>
          SolStore
        </div>
        <Animated />
        <AuthVerify logOut={logOut} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
