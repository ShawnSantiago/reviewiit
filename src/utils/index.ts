import nlp from 'compromise';
var natural = require('natural');
const tokenizer = new natural.WordTokenizer()

export const processData = (data: any) => {
  return data.data.children.map((x: any) => {
    return {
      id: x.data["id"],
      selftext: x.data["selftext"],
      title: x.data["title"],
      url: x.data["url"],
      score: x.data["score"],
      subbreddit: x.data["subreddit"],
    }
  })
}

export const getKarmaScore = (data: number) => {
    if (data > 0 && data < 10)      return  1
    if ( data > 10 && data < 25)    return  2
    if ( data > 25 && data < 50)    return  3
    if (data > 50 && data < 100)    return  4
    if (data > 100 && data < 250)   return  5
    if (data > 250 && data < 500)   return  6
    if (data > 500 && data < 1000)  return  7
    if (data > 1000 && data < 2500) return  8
    if (data > 2500 && data < 5000) return  9
    if (data > 5000)                return  10
} 

export const getTextScore = (userQuery: string, data: string) => {
  
  // Get frequency of terms in user query
  const tfidf = new natural.TfIdf()
  const tokenizedQuery = tokenizer.tokenize(userQuery)
  const tokenizedData = tokenizer.tokenize(data)

  const loopThruQuery = (userQuery:any, counter:number, parsedData:any) =>{  
    let currentCount = counter > 0 ? counter : 0;
      if(tokenizedQuery[currentCount+1]){
        loopThruQuery(userQuery,currentCount+1, parsedData.filter((a:any,b:any) => {
          if(a == tokenizedQuery[currentCount] ) return tokenizedQuery[currentCount+1] == tokenizedData[b+1]
          else return true
        }))
      }
      return parsedData.filter((a:any,b:any) => {
        if(a == tokenizedQuery[currentCount] ) return tokenizedQuery[currentCount-1] == tokenizedData[b-1]
        else return true
      })
  }
  tfidf.addDocument( loopThruQuery(tokenizedQuery, 0, tokenizedData ))

  // If user query is a name with more then one word. Look for word distance in data. 
  // Eg. Name - Magic Bullet, Data - The bullet is made of magic. Find the distance from each word to measure relation 
  return (tfidf.tfidfs([userQuery,'review'], 0)[0])
}

export const getSentimentScore = (data: string) => {
  var Analyzer = require('natural').SentimentAnalyzer;
  var stemmer = require('natural').PorterStemmer;
  var analyzer = new Analyzer("English", stemmer, "afinn");

  return analyzer.getSentiment(tokenizer.tokenize(data))
}