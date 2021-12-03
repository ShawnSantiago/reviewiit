import { useState } from 'react';

import {
  processData,
  getKarmaScore,
  getSelfTextScore
} from './utils';


function App() {
  const [userQuery, setUserQuery] = useState('');

  const searchUrl = `https://www.reddit.com/search.json?q=${userQuery}&limit=100&sort=relevance`;

  const handleUserInput = (e: any) => {
    e.preventDefault();
    setUserQuery(e.target.value)
    fetch(`${searchUrl}`).then(response => response.json())
    .then(data => console.log(sortData(processData(data))))
  }
  
  const sortData = (data: any) =>{
    for (let index = 0; index < data.length; index++) {
      const listing = data[index]
      let relevancyScore = 0
        
      // For text data points | if text include words = 1 | if text includes whole words ie "Magic Bullet" = 5 | if text includes whole words plus "review, guide" = 10
      relevancyScore += getSelfTextScore(userQuery, listing['selftext']) ?? 0
      relevancyScore += getSelfTextScore(userQuery, listing['title']) ?? 0

      //For data point "subreddit" is related to word entered ie Magic Bullet - Subreddit is Blenders. PS. not sure how to rank or do this 
      
      // For data point "score" 0-10 = 1 | 10 - 25 = 2 | 25 - 50 = 3 | 50 - 100 = 4 | 100 - 250 = 5 | 250 - 500 = 6 | 500 - 1000 = 7 | 1000 - 2500 = 8 | 2500 - 10000 = 9 | 10000> 10
      relevancyScore += getKarmaScore(listing['score']) ?? 0
  
      listing.relevancyScore = relevancyScore
    }
  
    return data.sort(( a: any , b: any ) => b.relevancyScore - a.relevancyScore)
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
