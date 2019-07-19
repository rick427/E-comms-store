import React from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../../context/auth';

const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="text-muted">User Links</h5>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/profile/update" className="nav-link">Update Profile</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header mb-1 text-muted">User Information</h3>
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

    const purchaseHistory = () => (
        <div className="card mb-3 m-2">
            <h3 className="card-header text-muted">Purchase History</h3> 
            <ul className="list-group m-1">
                <li className="list-group-item">
                    <p className="lead">History</p>
                </li>
            </ul>
        </div>
    );

    return (
        <Layout 
           title="Dashboard" 
           className="container-fluid" 
           description={`Welcome ${name}!.. You can update your dashboard here and get other relevant info.`}>
           <div className="row">
               <div className="col-3">
                   {userLinks()}
               </div>
               <div className="col-9">
                   {userInfo()}
                   {purchaseHistory()}
               </div>
           </div>
        </Layout>
    )
}

export default Dashboard;
