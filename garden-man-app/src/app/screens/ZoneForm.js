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
import MySelect from "./select";

const ZoneForm =  props => (
      <div>
          <TextField
            required
            id="name"
            name="name"
            value={props.name}
            label="Zone Name"
            placeholder="Zone Name"
            onChange={props.handleChange}
            margin="normal"
          />

          <br />
          <br />

          <TextField
            id="description"
            name="description"
            value={props.description}
            label="Description"
            placeholder="Description"
            onChange={props.handleChange}
            margin="normal"
          />
          <br />
          <br />              
          <MySelect
            name="Pin"
            label="Choose a pin number"
            value={props.pin}
            onChange={props.handleChange}
            options={props.options}
          />
          <br />
          <br />
          <br />
          <br />
            <FormControl component="fieldset" >
              <FormLabel component="legend">Zone Category</FormLabel>
              <RadioGroup
                row
                aria-label="category"
                name="category"
                value={props.category}
                onChange={props.handleChange}
              >
                <FormControlLabel
                  value="source"
                  control={<Radio color="primary" />}
                  label="Source"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="target"
                  control={<Radio color="primary" />}
                  label="Target"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="pass"
                  control={<Radio color="primary" />}
                  label="Passthrough"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
        </div>
        )

export default ZoneForm