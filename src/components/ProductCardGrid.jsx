import React from 'react';

function ProductCard(props){ 

    return (
        <ul className="list-group">
            { props.data && props.data.map((listitem, idx)=> ( <li key={idx} className="">{listitem.title} </li>))}
        </ul>
    )
}   
export default ProductCard;
