import './App.css';
import { useState } from 'react';


function App() {
  const [userQuery, setUserQuery] = useState('');

  const searchUrl = `https://www.reddit.com/search.json?q=${userQuery}&limit=100&sort=relevance`;

  const handleUserInput = (e: any) => {
    e.preventDefault();
    setUserQuery(e.target.value)
    fetch(`${searchUrl}`).then(response => response.json())
    .then(data => console.log(sortData(processData(data))))
  },
  processData = (data: any) => {
    return data.data.children.map((x: any) => {
      return {
        id: x.data["id"],
        selftext: x.data["selftext"],
        title: x.data["title"],
        url: x.data["url"],
        score: x.data["score"],
        subbreddit:x.data["subreddit"],
      }
    })
  },
  sortData = (data: any) =>{
   return data.sort(( a:any , b:any ) => {
      return  b.score - a.score;
    })
  }
  
  return (
    <>
    <div id="appContainer">      
      <h1>
        real review
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
