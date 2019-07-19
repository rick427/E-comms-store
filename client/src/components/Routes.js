import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import Home from './core/Home';
import PrivateRoute from '../context/auth/privateRoute';
import Dashboard from './user/Dashboard';
 import Menu from './core/Menu';
import AdminRoute from '../context/auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';

const Routes = () => {
  return (
      <Router>
          <Menu/> 
          <Switch>
              <Route path = "/" exact component={Home}/>
              <Route path ="/login" exact component={Login}/>
              <Route path = "/register" exact component={Register} />
              <Route path = "/shop" exact component={Shop} />
              <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
              <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
              <AdminRoute path="/create/category" exact component={AddCategory}/>
              <AdminRoute path="/create/product" exact component={AddProduct}/>
          </Switch>
      </Router>
  )
}

export default Routes;