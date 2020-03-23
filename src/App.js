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
//import Speech from './Speech';


function App() {

  const [showInventory, setShowInventory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [inventory, setInventory] = useState([]);
  const [collectedData, setCollectedData] = useState(['productCategory', 'size', 'color', 'price', 'comments']);

  const handleAddClick = (inventoryItem) => {
    const newInventory = [...inventory,inventoryItem];
    setInventory(newInventory);
  }

  const handleAddToCollectedData = (dataItem) => {
    const newCollectedData = [...collectedData, dataItem];
    setCollectedData(newCollectedData);
  }

  const handleDeleteFromCollectedData = (dataItem) => {
    const allDataExecptDeleted = collectedData.filter(data => {
        if(data !== dataItem) {
          return data;
        }
      return;
    });
    const newCollectedData = [...allDataExecptDeleted];
    console.log(newCollectedData);
    setCollectedData(newCollectedData);
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
    console.log(`Selling ${e.target.name} - ${e.target.value}`)
    const tagSold = e.target.value;
    const itemSoldIndex = inventory.findIndex(el => el.tag === tagSold && el.sold === false);
    if (itemSoldIndex !== -1) {
      const soldItem = inventory[itemSoldIndex]
      soldItem.sold = true;
      const newInventory = [...inventory];
      setInventory(newInventory);
      alert(`Myyty: ${soldItem.color} ${soldItem.productCategory}, ${soldItem.price}€`)
    }
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
          <NewProduct
            collectedData={collectedData}
            handleAddClick={(e) => handleAddClick(e)}/> :
        showSettings ?
          <Settings
            collectedData={collectedData}
            handleAddToCollectedData={(e) => handleAddToCollectedData(e)}
            handleDeleteFromCollectedData={(e) => handleDeleteFromCollectedData(e)}/> :
          <Dashboard
            collectedData={collectedData}
            inventory={inventory}
            sell={sell}
          />
        
      }
    </div>
  );
}

/*
<Speech/>
*/
export default App;
