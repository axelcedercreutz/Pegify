import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

function Inventory(props) {
  return (
    <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Size
              </TableCell>
              <TableCell>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.inventory.map(inventoryItem => {
            return(
              <TableRow key={inventoryItem.name}>
              <TableCell>
                {inventoryItem.name}
              </TableCell>
              <TableCell>
                {inventoryItem.size}
              </TableCell>
              <TableCell>
                {inventoryItem.price}
              </TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
  );
}

export default Inventory;