import React from 'react'
import SuccessDialog from "./successDialog";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';


function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}


const RouteForm =  props => (
      <div>
          <TextField
            required
            id="f_name"
            name="f_name"
            value={props.f_name}
            label="Route Name"
            placeholder="Route Name"
            onChange={props.onChange}
            margin="normal"
          />

          <br />

          <TextField
            id="f_description"
            name="f_description"
            value={props.f_description}
            label="Description"
            placeholder="Description"
            onChange={props.onChange}
            margin="normal"
          />
          <br />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source Zone</TableCell>
                <TableCell>Passthrough Zones</TableCell>
                <TableCell>Target Zones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {
                    props.zones.map( (zone) => (
                      zone.category == 'source' ? 
                        <Chip 
                          key={zone.id} 
                          label={zone.name} 
                          onClick={() => {props.toggleChipSingle(zone.id, 'f_source')}} 
                          color={props.f_source === zone.id ? 'primary' : ''}
                        /> 
                      : 
                        ''
                    ))}
                </TableCell>
                    {
                    props.zones.map( (zone) => (
                      zone.category == 'pass' ? 
                        <Chip 
                          key={zone.id} 
                          label={zone.name} 
                          onClick={() => {props.toggleChip(zone.id, 'f_passthrough')}} 
                          color={props.f_passthrough.indexOf(zone.id) !== -1 ? 'primary' : ''}
                        /> 
                      : 
                        ''
                    ))}
                <TableCell>
                    {
                    props.zones.map( (zone) => (
                      zone.category == 'target' ? 
                        <Chip 
                          key={zone.id} 
                          label={zone.name} 
                          onClick={() => {props.toggleChip(zone.id, 'f_target')}} 
                          color={props.f_target.indexOf(zone.id) !== -1 ? 'primary' : ''}
                        /> 
                      : 
                        ''
                    ))}
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
              
          </div>
        )

export default RouteForm