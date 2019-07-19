import React, {useState, useEffect} from 'react'

const Checkbox = ({categories}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = category => () => {
        //return first index or -1
      const currentcatId = checked.indexOf(category);
      const newcheckedCatId = [...checked];
      if(currentcatId === -1){
          newcheckedCatId.push(category)
      }
      else{
          newcheckedCatId.splice(currentcatId, 1)
      }
      console.log(newcheckedCatId);
      setChecked(newcheckedCatId);
    }

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input 
               type="checkbox" 
               onChange={handleToggle(category._id)} 
               value={checked.indexOf(category._id === -1)} 
               className="form-check-input"
            />
            <label className="form-check-label">{category.name}</label>
        </li>
    ))
}
export default Checkbox;
