import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

function App() {

  const [ showInventory, setShowInventory ] = useState(false);

  const handleClick = () => {
    setShowInventory(!showInventory);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleClick}>
            {!showInventory ? 'Show Inventory' : 'Add new'}
          </Button>
        </Toolbar>
      </AppBar>
      {!showInventory ?
        <SignIn/> :
        <div>
          <Typography>Test</Typography>
        </div>
      }
    </div>
  );
}

export default App;
