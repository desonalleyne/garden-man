import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


const ZoneTable = props => (
  <Table fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
    <TableHead>
      <TableRow>
        <TableCell>No.</TableCell>
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
          props.zones.map((zone,idx)=> (
            <TableRow key={zone.Id}>
              <TableCell component="th" scope="row">{idx+1}</TableCell>
              <TableCell align="right">{zone.name}</TableCell>
              <TableCell align="right">{zone.description}</TableCell>
              <TableCell align="right">{zone.category}</TableCell>
              <TableCell align="right">{zone.pin}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => { props.editZone(zone) } } 
                  size="small" 
                  color='secondary' 
                  variant="outlined"
                >
                  Edit
                </Button>
                 
                { /*<Button 
                  onClick={() => { props.deleteZone(zone) } } 
                  size="small" 
                  color='secondary' 
                  variant="outlined"
                >
                  Delete
                </Button> */ }
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