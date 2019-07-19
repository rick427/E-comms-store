import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from '../../context/auth/core';
import Card from './Card';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState('');

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError({server:data.error, message: error});
            }
            else{
                setProductsBySell(data);
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                setProductByArrival(data);
            }
        })
    }

    useEffect(() => {
      loadProductsBySell();
      loadProductsByArrival();
      //eslint-disable-next-line
    }, [])
    return (
        <Layout title="HomePage" description="E-Comms App" className="container-fluid">
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
               {productByArrival && productByArrival.map(product => <Card key={product._id} product={product}/>)}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
               {productsBySell && productsBySell.map(product => <Card key={product._id} product={product}/>)}
            </div>
        </Layout>
    )
}

export default Home;
