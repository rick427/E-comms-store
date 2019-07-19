import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {RegisterUser} from '../../context/auth';

const Register = () => {
  //Local State
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
 });
 const {name, email, password, error, success} = user;

 //HandleChange 
 const handleChange = e => {
   setUser({...user, error:false, [e.target.name]: e.target.value})
 };

 //HandleSubmit
 const handleSubmit = e => {
     e.preventDefault();
     setUser({...user, error: false});

    RegisterUser({name, email, password}).then(data => {
       if(data.error){
         setUser({...user, error: data.error, success: false})
       }
       else{
         setUser({...user, name: '', email: '', password: '', success:true})
       }
    });
 };
 
 //Show Error Method
 const showError = () => (
   <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
   </div>
 );

 //Show Success Method
 const showAlert = () => (
  <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
     New Account Created. Please <Link to="/login">Login</Link> 
  </div>
 );

 //Register Form Method
 const  RegisterForm = () => (
    <form onSubmit={handleSubmit}>
         <div className="form-group">
             <label className="text-muted">Name</label>
             <input 
                name="name"
                onChange={handleChange}
                value={name}
                type="text" 
                className="form-control"
             />
         </div>
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
         <button className="btn btn-block btn-outline-success">Register</button>
    </form>
 )


 return (
    <Layout 
      title="Register" 
      className="container mx-auto col-md-6 offset-md-2" 
      description="SignUp to create an account with us and enjoy all privileges"
    >
      {showError()}
      {showAlert()}
      {RegisterForm()}
      {/* {JSON.stringify(user)} */}
    </Layout>
 )
}
export default Register;
