import React, {useState} from 'react'

const RadioBox = ({prices, handleFilter}) => {
    const [price, setPrices] = useState(0);

    const handleChange = e => {
       handleFilter(e.target.value);
       setPrices(e.target.value);
    }

    return prices.map((p, i) => (
        <div key={i}>
            <input 
               type="radio" 
               className="mr-2 ml-4"
               value={`${p._id}`}
               onChange={handleChange} 
               name="price"
            />
            <label className="form-check-label">{p.name}</label>   
        </div>
    ))
}

export default RadioBox;
