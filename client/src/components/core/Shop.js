import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories} from '../../context/auth/core';
import Card from './Card';
import Checkbox from './Checkbox';
import {prices} from './FixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    })

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setCategories(data);
            }
        });
    }

    useEffect(() => {
        init()
    }, [])

    const handleFilter = (filters, filterBy) => {
        //console.log('SHOP', filters, filterBy)
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === "price"){
            let priceValue = handlePrice(filters);
            newFilters.filters[filterBy] = priceValue;
        }

        loadFilterRwsults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const loadFilterRwsults = newFilters => {
      console.log(newFilters)
    }

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }

    return (
        <Layout 
           title="Shop page" 
           description="Search and find products of your choice" 
           className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                   <h4>Filter by categories</h4>
                   <ul>
                      <Checkbox 
                         handleFilter={(filters) => handleFilter(filters, "category")} 
                         categories={categories}
                        />
                   </ul>
                   <h4>Filter by prices</h4>
                   <div>
                      <RadioBox 
                         handleFilter={(filters) => handleFilter(filters, "price")} 
                         prices={prices}
                        />
                   </div>
                </div>
                <div className="col-8">
                    {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}
export default Shop;
