import React from 'react';
import Header from './components/header.js';
import Board from './components/board.js';
import './App.css';

export default function App() {

  return (
    <div className="App">
      <Header/>
      <Board/>
    </div>
  );
}
