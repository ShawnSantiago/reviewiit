import React from 'react';

class ProductCard extends React.Component { 
    constructor(props) {
        super(props);

        console.log('PROPS:', props)
    }

    render() {
        return   <ul className="list-group">
                    {/* {this.props.productData.map((listitem)=> (
                    <li className="" />
                    ))} */}
                </ul>
        }   
}   
export default ProductCard;
