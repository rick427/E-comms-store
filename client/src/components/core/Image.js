import React from 'react';
import {API} from '../../config';

const Image = ({item, url}) => {
    return (
        <div className="product-img">
            <img 
               className="mb-3" 
               src={`${API}/${url}/photo/${item._id}`} 
               alt={item.name} 
               style={{maxHeight: '60%', maxWidth: '70%'}} 
            />
        </div>
    )
}
export default Image;
