import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home';
import Character from './components/Character';
// import Planet from './components/Planet';
import Film from './components/Film'
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
    <Router>
      <Routes>
        <Route exact path='/' element={<Home data={data} />} />
        <Route path='/character/:id' element={<Character />} />
        <Route path='/films/:id' element={<Film />} />
        {/* <Route path='planet/:id' element={<Planet />} /> */}
      </Routes>
    </Router>
  )
}

export default App
