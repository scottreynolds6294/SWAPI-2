import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
    <h1>Star Wars Universe Lookup</h1>
    <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
        here)</span></label>
    <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
  </div>
  <section id="charactersList">
  </section>
    </>
  )
}

export default App
