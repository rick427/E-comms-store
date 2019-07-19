import React, {useState} from 'react'

const RadioBox = ({prices}) => {
    const [price, setPrices] = useState(0);

    const handleChange = () => {
        console.log('handleChange')
    }

    return prices.map((p, i) => (
        <div key={i}>
            <input 
               type="radio" 
               className="mr-2 ml-4"
               value={`${p._id}`}
               onChange={handleChange} 
            />
            <label className="form-check-label">{p.name}</label>   
        </div>
    ))
}

export default RadioBox;
