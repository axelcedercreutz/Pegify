import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

function Inventory(props) {
  console.log(props);
  return (
    <Table>
          <TableHead>
            <TableRow>
              {props.collectedData.map(data => {
                return(
                  <TableCell>
                    {data}
                  </TableCell>
                );
              })}
              <TableCell>
                Sold
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.inventory.map(inventoryItem => {
            return(
              <TableRow>
                {props.collectedData.map(data => {
                  return(
                    <TableCell>
                      {inventoryItem[data] ? inventoryItem[data] : ''}
                    </TableCell>
                  );
                })}
                <TableCell>
                  {inventoryItem.sold ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
  );
}

export default Inventory;