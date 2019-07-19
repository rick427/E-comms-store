import React from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../../context/auth';

const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <div className="card-header">
                    <h5>Admin Links</h5>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/create/category" className="nav-link">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/create/product" className="nav-link">Create Products</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header mb-1 text-muted">Admin Profile</h3>
            <ul className="list-group m-1">
                <li className="list-group-item">
                    <p className="lead">Name: {' '}
                        <span className=" font-weight-normal">{name} | {' '} {_id}</span>
                    </p>
                </li>
                <li className="list-group-item">
                    <p className="lead">Email: {' '}
                        <span className=" font-weight-normal">{email}</span>
                    </p>
                </li>
                <li className="list-group-item">
                    <p className="lead">Role: {' '}
                        <span className={role === 1 ?'text-success font-weight-normal text-capitalize' : 'text-primary text-capitalize font-weight-normal'}>
                            {role === 1 ? 'admin' : 'user'}
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    );

    return (
        <Layout 
           title="Admin Dashboard" 
           className="container-fluid" 
           description={`Welcome Admin ${name}!... You can have complete CRUD access.`}>
           <div className="row">
               <div className="col-3">
                   {adminLinks()}
               </div>
               <div className="col-9">
                   {adminInfo()}
               </div>
           </div>
        </Layout>
    )
}

export default AdminDashboard;
