import React from 'react';
import Reader from './Reader'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <form>
        <label>
          Nimi:
          <input type="text" name="name" />
        </label>
        <label>
          Koko:
          <input type="text" name="size" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Reader/>
      </header>
    </div>
  );
}

export default App;
