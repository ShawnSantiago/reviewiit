import React, {useState} from 'react';
import { sortData, processData } from '../utils';
import ProductCardGrid from './ProductCardGrid';


function MainForm() {

    console.log('rendered mainform')

    const [userQuery, setuserQuery] = useState();
    const [productData, setProductData] = useState();
    
    const handleUserInput = (e) => {
      e.preventDefault();

      const searchUrl = `https://www.reddit.com/search.json?q=${userQuery}%20review&limit=100&sort=relevance`;

      fetch(`${searchUrl}`)
        .then(response => response.json())
        .then(data => setProductData(sortData(processData(data),userQuery)))
    }
     
    return (
      <form action="" onSubmit={ e => handleUserInput(e) }>
        <input type='text' onChange={ e => setuserQuery(e.target.value)}/>
        <input type='submit' value='search reddit' />
        <div id="results">
          <ul className="list-group">
              {productData && productData.map((listitem, idx)=> ( <li key={idx} className="">{listitem.title} </li>))}
          </ul>
        </div>
      </form>
    )
}
export default MainForm;
