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
              <TableRow>
              <TableCell>
                {inventoryItem.name}
              </TableCell>
              <TableCell>
                {inventoryItem.size}
              </TableCell>
              <TableCell>
                Price
              </TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
  );
}

export default Inventory;