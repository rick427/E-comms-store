import {API} from '../../config';

//Register User Method
export const RegisterUser = user => {
    return fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err))
};


//Login User Method
export const LoginUser = user => {
    return fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err))
};

//Save to LocalStorage
export const authenticate = (data, callback) => {
  if(typeof window!== 'undefined'){
    localStorage.setItem('token', JSON.stringify(data));
    callback();
  }
}

//Logout
export const logOut = callback => {
  if(typeof window !== 'undefined'){
    localStorage.removeItem('token');

    callback();

    return fetch(`${API}/logout`, {
      method: "GET"
    })
    .then(res => console.log('Signout', res))
    .catch(err => console.log(err));
  }
}

//Get token in localStorage for auth check
export const isAuthenticated = () => {
  if(typeof window == 'undefined') return false;

  else if(localStorage.getItem('token')){
    return JSON.parse(localStorage.getItem('token'))
  }

  else{
    return false;
  }
}
