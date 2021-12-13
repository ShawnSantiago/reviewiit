import React from 'react';
import { sortData,processData } from '../utils';

class MainForm extends React.Component {
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
        .then(data => this.setState({setproductData : sortData(processData(data),this.state.userQuery)} )
      }
    render() {
        return    <form action="" onSubmit={e => this.handleUserInput(e)}>
        <input type='text' onChange={e => this.setState({userQuery: e.target.value})}/>
        <input type='submit' value='search reddit' />
      </form>
        }
    }
export default MainForm;
