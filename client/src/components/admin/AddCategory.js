import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../../context/auth';
import {CreateCategory} from '../../context/auth/admin';

const AdminCategory = () => {
    //Local State
    const [name, SetName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    //HandleChange
    const handleChange = e => {
        setError('');
        SetName(e.target.value)
    };

    //HandleSubmit
    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        //api request
        CreateCategory(user._id, token, {name}).then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                setError('');
                setSuccess(true);
            }
        })
    };

    //Show success alert
    const showAlert = () => {
        if(success){
            return (
            <div className="alert alert-success">
              <h6 className="text-success">Category "{name}" was created successfully</h6>
            </div>
          );
        }
    };

    //Show error alert
    const showError = () => {
        if(error){
            return (
                <div className="alert alert-danger">
                  <h6 className="text-danger">Category "{name}" already exists. Use Another</h6>
                </div>
            )
        }
    }

    const goBack = () => (
        <Link to="/admin/dashboard" className="btn btn-danger mt-4">
            Back to Dashboard
        </Link>
    )


    const CategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                   type="text" 
                   onChange={handleChange}
                   value={name}
                   className="form-control"
                   autoFocus
                   required
                />

                <div className="btns d-flex justify-content-center">
                    <button className="btn btn-outline-primary mt-4 mr-5">
                        Create Category
                    </button>
                    {goBack()}
                </div>
            </div>
        </form>
    )

    return (
        <Layout 
           title="Add a new Category" 
           description={`Category "${name}" is been added to the Store`}
        >
          <div className="row">
              <div className="col-md-8 offset-md-2">
                  {showAlert()}
                  {showError()}
                  {CategoryForm()}
              </div>
          </div>
        </Layout>
    )
}

export default AdminCategory;
