import React from 'react';


class ProductCard extends React.Component {
    constructor(props:any) {
        super(props);
        console.log(this.state)
      }
    render() {
        return   <ul className="list-group">
                    {['test'].map((listitem:any)=> (
                    <li className="list-group-item list-group-item-primary" />
                    ))}
                </ul>
        }
    }
export default ProductCard;
