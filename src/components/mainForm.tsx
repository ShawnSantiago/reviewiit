import React from 'react';
import { sortData,processData } from '../utils';
import ProductCard from './productCard';

interface MyProps {}

interface MyState {
    userQuery:string,
    setproductData:any
}
class MainForm extends React.Component<MyProps, MyState> {
    constructor(props:any) {
        super(props);
        this.state = {
            userQuery: '',
            setproductData: ''
        };
      }
    handleUserInput = (e: any) => {
        e.preventDefault();
        const searchUrl = `https://www.reddit.com/search.json?q=${this.state.userQuery}%20review&limit=100&sort=relevance`;
        fetch(`${searchUrl}`).then(response => response.json())
        .then(data => this.setState({setproductData : sortData(processData(data),this.state.userQuery)}))
      }
    render() {
        const data = {
            data: this.state.setproductData
        };
        return    <form action="" onSubmit={e => this.handleUserInput(e)}>
        <input type='text' onChange={e => this.setState({userQuery: e.target.value})}/>
        <input type='submit' value='search reddit' />
        <div id="results"><ProductCard {...data}/></div>
      </form>
      
        }
    }
export default MainForm;
