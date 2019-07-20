import React, {useState, useEffect} from 'react';
import {getCategories} from '../../context/auth/core';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        singleCategory: '',
        search: '',
        results: [],
        searched: false
    })

    const {categories, singleCategory, search, results, searched} = data;

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

    return (
        <div>
            <h2>Search Bar</h2>
            {JSON.stringify(categories)}
        </div>
    )
}

export default Search;
