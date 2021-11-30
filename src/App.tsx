import './App.css';
import { useState } from 'react';


function App() {
  const [userQuery, setUserQuery] = useState('');

  const searchUrl = `https://www.reddit.com/search.json?q=${userQuery}&limit=10&sort=relevance`;

  const handleUserInput = (e: any) => {
    e.preventDefault();
    setUserQuery(e.target.value)
    fetch(`${searchUrl}`).then(response => response.json())
    .then(data => console.log(data))
  }
  
  return (
    <>
    <div id="appContainer">      
      <h1>
        hello real review
      </h1>
      <form action="" onSubmit={e => handleUserInput(e)}>
        <input type='text' onChange={e => setUserQuery(e.target.value)}/>
        <input type='submit' value='search reddit' />
      </form>
      <div id="results"></div>
    </div>
    </>
  )
}

export default App;
