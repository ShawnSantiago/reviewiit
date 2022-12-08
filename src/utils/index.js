var natural = require("natural");
const tokenizer = new natural.WordTokenizer();

export const processData = (data) => {
  return data.data.children.length > 0
    ? data.data.children.map((x) => {
        return {
          id: x.data["id"],
          selftext: x.data["selftext"],
          title: x.data["title"],
          url: x.data["url"],
          score: x.data["score"],
          subbreddit: x.data["subreddit"],
        };
      })
    : [];
};

export const getKarmaScore = (data) => {
  if (data > 0 && data < 10) return 1;
  if (data > 10 && data < 25) return 2;
  if (data > 25 && data < 50) return 3;
  if (data > 50 && data < 100) return 4;
  if (data > 100 && data < 250) return 5;
  if (data > 250 && data < 500) return 6;
  if (data > 500 && data < 1000) return 7;
  if (data > 1000 && data < 2500) return 8;
  if (data > 2500 && data < 5000) return 9;
  if (data > 5000) return 10;
};

export const getTextScore = (userQuery, data) => {
  // Get frequency of terms in user query
  const tfidf = new natural.TfIdf();
  const tokenizedQuery = tokenizer.tokenize(userQuery);
  const tokenizedData = tokenizer.tokenize(data.toLowerCase());

  function callback(a, b) {
    const counter = this.count,
      length = this.userQueryLength;
    if (counter === length - 1) {
      if (a === tokenizedQuery[counter])
        return tokenizedQuery[counter - 1] === tokenizedData[b - 1];
      else return true;
    } else {
      if (a === tokenizedQuery[counter])
        return tokenizedQuery[counter + 1] === tokenizedData[b + 1];
      else return true;
    }
  }

  const loopThruQuery = (userQuery, counter, parsedData) => {
    let currentCount = counter;
    if (currentCount === userQuery.length - 1) {
      return parsedData.filter(callback, {
        count: counter,
        userQueryLength: userQuery.length,
      });
    } else {
      return loopThruQuery(
        userQuery,
        currentCount + 1,
        parsedData.filter(callback, {
          count: counter,
          userQueryLength: userQuery.length,
        })
      );
    }
  };

  tfidf.addDocument(
    tokenizedQuery.length > 1
      ? loopThruQuery(tokenizedQuery, 0, tokenizedData)
      : tokenizedData
  );
  // If user query is a name with more then one word. Look for word distance in data.
  // Eg. Name - Magic Bullet, Data - The bullet is made of magic. Find the distance from each word to measure relation
  return tokenizedData.length > 0 ? tfidf.tfidfs(tokenizedQuery, 0)[0] : 0.1;
};

export const getSentimentScore = (data) => {
  var Analyzer = require("natural").SentimentAnalyzer;
  var stemmer = require("natural").PorterStemmer;
  var analyzer = new Analyzer("English", stemmer, "afinn");

  return analyzer.getSentiment(tokenizer.tokenize(data));
};

export const sortData = (data, userQuery) => {
  // Filter out titles that don't include search terms
  const filterListingBasedOnTitle = data.filter(
    (a) => getTextScore(userQuery, a["title"]) > 0
  );

  // Loop through relevant listings
  for (let index = 0; index < filterListingBasedOnTitle.length; index++) {
    const listing = filterListingBasedOnTitle[index];
    let relevancyScore = 0;

    // Get relevancy score for each listing
    relevancyScore += getTextScore(userQuery, listing["selftext"]) ?? 0;

    // Get sentiment score for each listing
    listing.sentimentScore = getSentimentScore(listing["selftext"]);
    listing.relevancyScore = relevancyScore;
  }

  // Return sorted listings by relevancy score
  return filterListingBasedOnTitle
    .sort((a, b) => b.relevancyScore - a.relevancyScore)
    .filter((a) => a.relevancyScore > 0);
};

export function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
