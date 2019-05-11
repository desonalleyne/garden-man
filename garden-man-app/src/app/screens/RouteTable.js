import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const RouteTable = props => (

  <Table padding='none'>
    <TableHead>
      <TableRow>
        <TableCell>No.</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Source Zone</TableCell>
        <TableCell align="right">Passthrough Zones</TableCell>
        <TableCell align="right">Target Zones</TableCell>
        <TableCell align="right">Edit/Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { 
        props.routes.length > 0 ? 
        (
          props.routes.map((route,idx)=> (
            <TableRow key={route.Id}>
              <TableCell component="th" scope="row">{idx+1}</TableCell>
              <TableCell align={route.name.numeric ? 'right' : 'left'}>{route.name}</TableCell>
              <TableCell align={route.description.numeric ? 'right' : 'left'}>{route.description}</TableCell>
              <TableCell align={route.source_zone.name.numeric ? 'right' : 'left'}>{route.source_zone.name}</TableCell>
              <TableCell align={route.passthrough_group.name.numeric ? 'right' : 'left'}>{route.passthrough_group.zones.map(zone => { return zone.name}).join(', ')}</TableCell>
              <TableCell align={route.target_group.name.numeric ? 'right' : 'left'}>{route.target_group.zones.map(zone => { return zone.name}).join(', ')}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => { props.populateForm(route) } } 
                  size="small" 
                  color='secondary' 
                  variant="outlined">
                  Edit
                </Button> 
                <Button 
                onClick={() => { props.deleteRoute(route) } } 
                size="small" 
                color='secondary' 
                variant="outlined">
                  Delete
                </Button>

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

export default RouteTable