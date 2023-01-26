import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Splash from './components/SplashPage';
import OneShop from './components/Oneshop';
import OnePost from './components/Onepost';
import ReviewForm from './components/ReviewForm';
import Purchases from './components/Purchases';
import Cart from './components/CartPage';
import Manage from './components/Manage';
import Search from './components/SearchedPage';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
        <NavBar />
          <Splash/>
          
        </Route>
        <Route path='/purchases' exact={true} >
          <NavBar/>
          <Purchases/>
          
        </Route>
        <Route path='/manage' exact={true} >
          <NavBar/>
          <Manage/>
          <Footer/>
        </Route>
        <Route path='/Cart' exact={true} >
          <NavBar/>
          <Cart/>
          <Footer/>
        </Route>
        <Route path='/search/:query' exact={true} >
          <NavBar/>
          <Search/>
          
        </Route>
        <Route path='/:shopId' exact={true} >
          <NavBar />
          <OneShop/>
         
        </Route>
        <Route path='/:shopId/posts/:id' exact={true} >
        <NavBar />
          <OnePost/>
          <Footer/>
        </Route>
        <Route path='/reviews/ree' exact={true} >
          <ReviewForm/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
