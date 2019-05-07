import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const ZoneTable = props => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>id</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Category</TableCell>
        <TableCell align="right">Pin</TableCell>
        <TableCell align="right">Edit/Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { 
        props.zones.length > 0 ? 
        (
          props.zones.map(zone=> (
            <TableRow key={zone.Id}>
              <TableCell component="th" scope="row">
                {zone.id}
              </TableCell>
              <TableCell align="right">{zone.name}</TableCell>
              <TableCell align="right">{zone.description}</TableCell>
              <TableCell align="right">{zone.category}</TableCell>
              <TableCell align="right">{zone.pin}</TableCell>
              <TableCell>
                <button onClick={() => { props.editZone(zone) } }>Edit</button> 
                <button onClick={() => { props.deleteZone(zone) } }>Delete</button>
              </TableCell>
            </TableRow>
          ))
        ) : (
            <TableRow><TableCell> No content to display </TableCell></TableRow>
        )  
      }
    </TableBody>
  </Table>
)

export default ZoneTable