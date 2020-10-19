import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Landing from './components/Layout/Landing'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register' 


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
