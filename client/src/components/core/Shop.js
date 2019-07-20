import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories, getFilteredProducts} from '../../context/auth/core';
import Card from './Card';
import Checkbox from './Checkbox';
import {prices} from './FixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filterRes, setFilterRes] = useState([]);
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
        init();
        loadFilterResults(skip, limit, myFilters.filters)
        //eslint-disable-next-line
    }, []);


    const loadFilterResults = newFilters => {
        //console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(res => {
            if(res.error){
                setError(res.error)
            }
            else{
                setFilterRes(res.data);
                setSize(res.size);
                setSkip(0);
            }
        })
      }
    
      const loadMore = () => {
          let toSkip = skip + limit;
          getFilteredProducts(toSkip, limit, myFilters.filters).then(res => {
              if(res.data){
                  setError(res.error)
              }
              else{
                  setFilterRes([...filterRes, ...res.data]);
                  setSize(res.size);
                  setSkip(toSkip);
              }
          }) 
      }

      const loadMoreButton = () => {
          return (
              size > 0 && size >= limit && (
                  <button onClick={loadMore} className="btn btn-warning mb-5">
                      Load MORE
                  </button>
              )
          )
      }
  

    const handleFilter = (filters, filterBy) => {
        //console.log('SHOP', filters, filterBy)
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === "price"){
            let priceValue = handlePrice(filters);
            newFilters.filters[filterBy] = priceValue;
        }

        loadFilterResults(myFilters.filters);
        setMyFilters(newFilters);
    };

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
                    <h2 className="mb-3">Products</h2>
                    <div className="row">
                      {filterRes.map(product => (
                          <Card product={product}/>
                      ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}
export default Shop;
