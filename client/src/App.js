import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
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
import PrivateRoute from './common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'



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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>

             <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>

             <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>

              <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>

            <Route exact path="/not-found" component={NotFound} />
            

          </div>
        <Footer />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
