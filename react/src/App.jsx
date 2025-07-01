import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home';
import Character from './components/Character';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/characters');
      if (!response.ok) {
        throw new Error('Characters could not be fetched');
      }
      const json_response = await response.json();
      setData(json_response);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };
  fetchData();
}
);

  return (

    <>
  <div>
  <h1>Star Wars Universe Lookup</h1>
  <label htmlFor="searchString">
    Who you looking for? <span className="small">(Regular expressions are cool here)</span>
  </label>
  <input id="searchString" onInput={() => {}} autoComplete="off" />
  </div>

  <section id="charactersList">
  </section>
    </>

    <Router>
      <Routes>
        <Route exact path='/' element={<Home data={data} />} />
        <Route path='/character/:id' element={<Character />} />
      </Routes>
    </Router>

  )
}

export default App
