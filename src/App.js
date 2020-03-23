import React, {useState} from 'react';
import './App.css';
import NewProduct from './NewProduct';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dashboard from './Dashboard';
import Settings from './Settings';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';


function App() {

  const [showInventory, setShowInventory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [ inventory, setInventory] = useState([]);

  const handleAddClick = (inventoryItem) => {
    const newInventory = [...inventory,inventoryItem];
    setInventory(newInventory);
  }

  const handleShowInventory = () => {
    showSettings && setShowSettings(!showSettings);
    setShowInventory(!showInventory);
  }
  const handleShowSettings = () => {
    showInventory && setShowInventory(!showInventory);
    setShowSettings(!showSettings);
  }

  const sell = (e) => {
    const tagSold = e.target.value;
    const itemSoldIndex = inventory.findIndex(el => el.tag === tagSold);
    inventory[itemSoldIndex].sold = true;
    setInventory(inventory);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleShowInventory}>
            {
              !showInventory ?
              <DashboardIcon/> :
              <AddIcon />
            }
          </Button>
          <Button color="inherit" onClick={handleShowSettings}>
            {
              !showSettings ?
              <SettingsIcon/> :
              <AddIcon />
            }
          </Button>
        </Toolbar>
      </AppBar>
      {!showInventory && !showSettings ?
          <NewProduct handleAddClick={(e) => handleAddClick(e)}/> :
        showSettings ?
          <Settings/> :
          <Dashboard inventory={inventory} sell={sell}/>
        
      }
    </div>
  );
}

export default App;
