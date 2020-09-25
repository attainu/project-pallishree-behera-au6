import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
//redux things import
import { loadUser} from './redux/actions/auth'
import setAuthToken from './utils/setAuthToken'
import store from './redux/store'

import Signup from './components/auth/Signup'
import Signin from './components/auth/Signin'
import Navbar from './components/layouts/Navbar'
import Home from './components/layouts/Home'
import Alert from './components/Alert/Alert'
import Posts from './components/posts/Posts';
import PostItems from './components/posts/PostItems';
import UploadPost from './components/posts/UploadPost';
import SinglePost from './components/posts/SinglePost';



  
if(localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {

useEffect(() => {
  store.dispatch(loadUser())
},[])
  return (
    <div>
       <Router>
         <Navbar />
        <Alert />
        <Switch>
        <div className="container mt-5" >

          <Route exact path='/' component={Home} />
          <Route exact path ="/signin" component={Signin} />
          <Route exact path ="/signup" component={Signup} />
          <Route exact path ="/posts" component={Posts} />
          <Route exact path ="/posts/:id" component={SinglePost} />
          <Route exact path ="/uploadpost" component={UploadPost} />
         </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
