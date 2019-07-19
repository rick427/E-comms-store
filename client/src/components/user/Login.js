import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {LoginUser, authenticate} from '../../context/auth';
import {isAuthenticated} from '../../context/auth';

const Login = () => {
  //Local State
  const [userLogin, setUser] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectTo: false
 });
 const {email, password, error, loading, redirectTo} = userLogin;
 const {user} = isAuthenticated();


 //HandleChange 
 const handleChange = e => {
   setUser({...userLogin, error:false, [e.target.name]: e.target.value})
 };


 //HandleSubmit
 const handleSubmit = e => {
     e.preventDefault();
     setUser({...userLogin, error: false, loading: true});

    LoginUser({email, password}).then(data => {
       if(data.error){
         setUser({...userLogin, error: data.error, loading: false})
       }
       else{
         authenticate(data, () => {
          setUser({...userLogin, redirectTo: true})
         })
       }
    });
 };
 
 //Show Error Method
 const showError = () => (
   <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
   </div>
 );

 //Show Loading Spinner
 const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h3 className="text-muted text-center">Loading...</h3>
      </div>
    )
 );

 //Redirect To
 const redirectUser = () => {
   if(redirectTo) {
     if(user && user.role === 1){
      return <Redirect to="/admin/dashboard"/>
     }
     else{
       return <Redirect to="/user/dashboard"/>
     }
   }
   else if(isAuthenticated()){
     return <Redirect to="/"/>
   }
 }

 //Login Form Method
 const  LoginForm = () => (
    <form onSubmit={handleSubmit}>
         <div className="form-group">
             <label className="text-muted">Email</label>
             <input 
                name="email"
                onChange={handleChange}
                value={email}
                type="email" 
                className="form-control"
             />
         </div>
         <div className="form-group">
             <label className="text-muted">Password</label>
             <input 
                name="password"
                onChange={handleChange}
                value={password}
                type="password" 
                className="form-control"
             />
         </div>
         <button className="btn btn-block btn-outline-success">Login</button>
    </form>
 )

    return (
        <Layout 
           title="Login" 
           className="container mx-auto col-md-6 offset-md-2" 
           description="Login to E-Comms App"
        >
          {showError()}
          {showLoading()}
          {LoginForm()}
          {redirectUser()}
        </Layout>
    )
}
export default Login;
