import React from 'react';
import {Link} from 'react-router-dom';
import Image from './Image';

const Card = ({product}) => {
    return (
        <div className="col-3 mb-3">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <Image item={product} url="product" />
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Link to="/">
                        <button className="btn btn-outline-primary mx-2 mt-2 mb-2">
                           View Product
                        </button>
                        <button className="btn btn-success mt-2 mb-2">
                           Add to cart
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;
