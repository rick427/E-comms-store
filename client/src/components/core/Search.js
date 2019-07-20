import React, {useState, useEffect} from 'react';
import {getCategories, list} from '../../context/auth/core';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const {categories, category, search, results, searched} = data;

    useEffect(() => {
       loadCategoreis();
       //eslint-disable-next-line
    }, []);

    const loadCategoreis = () => {
        getCategories().then(res => {
            if(res.error){
                console.log(res.error);
            }
            else{
                setData({...data, categories: res})
            }
        })
    }

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value, searched: false});
    }

    const handleSubmit = e => {
        e.preventDefault();
        searchData();
    }

    const searchData = () => {
        //console.log(search, category);
        if(search){
            list({search: search || undefined, category: category})
             .then(res => {
                 if(res.error) console.log(res.error);
                 else{
                     setData({...data, results: res, searched: true})
                 }
             })
        }
    }

    const searchForm = () => (
        <form onSubmit={handleSubmit}>
          <span className="input-group-text">
              <div className="input-group input-group-lg">
                  <div className="input-group-prepend">
                      <select className="btn mr-2"onChange={handleChange} name="category">
                          <option value="All">Pick a category</option>
                          {categories.map((cat, index) => (
                              <option key={index} value={cat._id}>{cat.name}</option>
                          ))}
                      </select>
                  </div>
                <input 
                    type="search" 
                    className="form-control"
                    onChange={handleChange}
                    name="search"
                    placeholder="Search by Name"
                    value={search}
                />
              </div>

              <div className="btn input-group-append" style={{border: 'none'}}>
                  <button className="input-group-text">Search</button>
              </div>
          </span>
        </form>
    )

    return (
        <div className="row">
           <div className="container mb-3">
               {searchForm()}
               {JSON.stringify(results)}
           </div>
        </div>
    )
}

export default Search;
