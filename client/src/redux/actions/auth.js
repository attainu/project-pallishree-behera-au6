import axios from 'axios'
import { setAlert } from './alert';
import {API} from '../../config'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../../utils/setAuthToken';

//load user

export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token) //if there is token put that token into global headers
  }

try {
  const res = await axios.get(`${API}/auth`);

  dispatch({
    type:USER_LOADED,
    payload:res.data
  })
} catch (err) {
  dispatch({
    type:AUTH_ERROR
  })
  
}


}


//register user
 export const register = ({ name, email, password,phone}) => async dispatch => {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   }


 const body = JSON.stringify({name, email, password,phone});

 try {

  const res = await axios.post(`${API}/user`, body, config);

  dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data   //here we get token as response
  })
   

  dispatch(loadUser());
 } catch (err) {
//errors
const errors = err.response.data.errors 

if(errors) {
  errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
}


   dispatch({
     type: REGISTER_FAIL
   })
 }
}

//loginuser
export const login = ( email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }


const body = JSON.stringify({ email, password});

try {

 const res = await axios.post(`${API}/auth`, body, config);

 dispatch({
   type: LOGIN_SUCCESS,
   payload: res.data   //here we get token as response
 });

 dispatch(loadUser());
  
} catch (err) {
//errors
const errors = err.response.data.errors 

if(errors) {
 errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
}


  dispatch({
    type: LOGIN_FAIL
  })
}
};

//logout / clear profile

export const logout = () => dispatch => {
  dispatch({
    type:LOGOUT
  });
  dispatch({
    type:CLEAR_PROFILE
  });
};