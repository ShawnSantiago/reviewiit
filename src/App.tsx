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
    // Rank data by giving a score to each variable out of 10 

    // For data point "score" 1-10 = 1 | 10 - 25 = 2 | 25 - 50 = 3 | 50 - 100 = 4 | 100 - 250 = 5 | 250 - 500 = 6 | 500 - 1000 = 7 | 1000 - 2500 = 8 | 5000 - 10000 = 9 | 10000> 10

    // For data point "selftext" | if text include words = 1 | if text includes whole words ie "Magic Bullet" = 5 | if text includes whole words plus "review, guide" = 10

    // For data point "title" | if text include words = 1 | if text includes whole words ie "Magic Bullet" = 5 | if text includes whole words plus "review, guide" = 10 

    //For data point "subreddit" is related to word entered ie Magic Bullet - Subreddit is Blenders. PS. not sure how to rank or do this 
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
