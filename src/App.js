import React from 'react';
import './App.css';

import Gol from './gol/gol'

function App() {
  return (
    <div className="App" ondragstart="return false;" ondrop="return false;">
      <h1> Game Of Life</h1>

      <Gol></Gol>
    </div>
  );
}

export default App;
