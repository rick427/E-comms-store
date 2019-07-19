import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logOut, isAuthenticated} from '../../context/auth';

const isActive = (history, path) => {
  if(history.location.pathname === path){
    return {color: 'lightblue'}
  }
  else {
      return {color: '#fff'}
  }
}

const {user} = isAuthenticated();


const Menu = ({history}) => {
    return (
        <div className="menu">
            <ul className="nav nav-tabs linkz">
                <li className="nav-item">
                    <Link 
                       className="nav-link" 
                       style={isActive(history,  '/')} 
                       to="/"
                    >
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link 
                       className="nav-link" 
                       style={isActive(history,  '/shop')} 
                       to="/shop"
                    >
                        Shop
                    </Link>
                </li>

                {isAuthenticated() && user.role === 0 && (
                    <li className="nav-item">
                        <Link 
                            className="nav-link" 
                            style={isActive(history, '/user/dashboard')} 
                            to="/user/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

               {isAuthenticated() && user.role === 1 && (
                    <li className="nav-item">
                        <Link 
                            className="nav-link" 
                            style={isActive(history, '/admin/dashboard')}
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link 
                            className="nav-link" 
                            style={isActive(history, '/login')} 
                            to="/login"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                            className="nav-link" 
                            style={isActive(history, '/register')} 
                            to="/register"
                            >
                                Register
                            </Link>
                        </li>
                    </>
                 )}

                 {isAuthenticated() && (
                    <li className="nav-item">
                      <span 
                        className="nav-link" 
                        style={{cursor: "pointer", color: "#fff"}} 
                        onClick={() => logOut(() => {
                            history.push('/')
                        })}
                        >
                            Logout
                      </span>
                    </li>
                 )}
            </ul>
        </div>
    )
}

export default withRouter(Menu);
