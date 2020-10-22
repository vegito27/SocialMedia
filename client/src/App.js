import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './App.css';
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Landing from './components/Layout/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register' 
import store from './store'
import {Provider} from 'react-redux'
import setAuthToken from './utils/setAuthToken' 
import { setCurrentUser } from './actions/authActions'
import {logOutUser} from './actions/authActions'
import Dashboard from './components/dashboard/Dashboard'
import {clearCurrentProfile} from './actions/profileActions'


if(localStorage.jwtToken){

  setAuthToken(localStorage.jwtToken)

  const decoded=jwt_decode(localStorage.jwtToken)

  store.dispatch(setCurrentUser(decoded))

  const currentTime=Date.now()/1000;

  if(decoded.exp<currentTime){

    store.dispatch(logOutUser())

    store.dispatch(clearCurrentProfile())

    window.location.href="/login"

  }
}


function App() {
  return (

    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        <Footer />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
