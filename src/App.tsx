import { useState } from 'react';

import {
  processData,
  getTextScore,
  getSentimentScore
} from './utils';

import ProductCard from './components/productCard';
import MainForm from './components/mainForm';
function App() {
  
  return (
    <>
    <div id="appContainer">      
      <h1>
        real review
      </h1>
      <MainForm />
      <div id="results"><ProductCard /></div>
    </div>
    </>
  )
}

export default App;
