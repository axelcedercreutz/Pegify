import React, {useState} from 'react';
import './App.css';
import NewProduct from './NewProduct';
import Inventory from './Inventory';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


function App() {

  const [ showInventory, setShowInventory ] = useState(false);

  const [ inventory, setInventory] = useState([]);
  console.log(inventory);

  const handleAddClick = (inventoryItem) => {
    const newInventory = [...inventory,inventoryItem];
    setInventory(newInventory);
  }

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
        <NewProduct handleAddClick={(e) => handleAddClick(e)}/> :
        <Inventory inventory={inventory}/>
      }
    </div>
  );
}

export default App;
