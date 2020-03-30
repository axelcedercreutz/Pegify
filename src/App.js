import React, {useState} from 'react';
import './App.css';
import NewProduct from './NewProduct';
import Dashboard from './Dashboard';
import Settings from './Settings';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  Snackbar,
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


function App() {

  const [showInventory, setShowInventory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [inventory, setInventory] = useState([]);
  const [collectedData, setCollectedData] = useState(['productCategory', 'size', 'color', 'price', 'comments']);
  const [open, setOpen] = useState(false);
  const [toastText, setToastText] = useState(false);

  const handleClick = (inventoryItem) => {
    const text = inventoryItem.productCategory + ' ' + inventoryItem.size + ' ' + inventoryItem.color + ' added';
    setToastText(text);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleAddClick = (inventoryItem) => {
    const newInventory = [...inventory,inventoryItem];
    handleClick(inventoryItem);
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

  function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
          />
        
          
      }
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            {toastText}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default App;
