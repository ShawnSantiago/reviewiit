import { useState } from 'react';

import {
  processData,
  getTextScore,
  getSentimentScore
} from './utils';


function App() {
  const [userQuery, setUserQuery] = useState('');

  const searchUrl = `https://www.reddit.com/search.json?q=${userQuery}%20review&limit=100&sort=relevance`;

  const handleUserInput = (e: any) => {
    e.preventDefault();
    setUserQuery(e.target.value)
    fetch(`${searchUrl}`).then(response => response.json())
    .then(data => console.log(sortData(processData(data))))
  }
  
  const sortData = (data: any) =>{
    // Filter out titles that don't include search terms
    const filterListingBasedOnTitle = data.filter((( a: any ) =>  getTextScore(userQuery, a['title']) > 0))

    // Loop through relevant listings 
    for (let index = 0; index < filterListingBasedOnTitle.length; index++) {
      const listing = filterListingBasedOnTitle[index]
      let relevancyScore = 0

      // Get relevancy score for each listing
      relevancyScore += getTextScore(userQuery, listing['selftext']) ?? 0
     
      // Get sentiment score for each listing
      listing.sentimentScore = getSentimentScore(listing['selftext'])
      listing.relevancyScore = relevancyScore
    }
  
    // Return sorted listings by relevancy score
    return filterListingBasedOnTitle.sort(( a: any , b: any ) => b.relevancyScore - a.relevancyScore).filter((( a: any ) => a.relevancyScore > 0))
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
