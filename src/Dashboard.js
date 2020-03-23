import React from 'react';
import Analytics from './Analytics';
import Inventory from './Inventory';
import Reader from './Reader';

function Dashboard(props) {
  return (
    <>
        <Analytics inventory={props.inventory}/>
        <Inventory
            collectedData={props.collectedData}
            inventory={props.inventory}
        />
        <Reader setTag={(e) => props.sell(e)}/>
    </>
  );
}

export default Dashboard;
