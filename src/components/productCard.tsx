import React from 'react';
type MyProps = {  };
type MyState = { productData: any };

class ProductCard extends React.Component<MyProps, MyState> {
    render() {
        const data = {
            data: this.state.productData
        };
        return   <ul className="list-group">
                    {data.map((listitem:any)=> (
                    <li className="list-group-item list-group-item-primary" />
                    ))}
                </ul>
        }
    }
export default ProductCard;
