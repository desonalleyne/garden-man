import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox  from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';


  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class Checkboxes extends React.Component{
    constructor(props){
    super(props);
    this.state = { 
      availableValues: ['one','two','three','founr'],
      checkedValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  handleCheck(day){
    this.setState(state => ({
          checkedValues: state.checkedValues.includes(day) ? state.checkedValues.filter(c => c !== day) : [...state.checkedValues, day]
        }))
  };

  handleChange(event){
    const target = event.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(value)
    this.setState({
      [name] : value
    });
  }


 setDate(date){
    this.setState({
      startDate: date
    });
  }

  render(){


    const { classes } = this.props;
 

    return (
      <div>
        
        <FormGroup row>
          { this.state.availableValues.map(day =>{
            return (
              <FormControlLabel 
                control={
                  <Checkbox
                  label={day} key={day.toString()}
                  onChange={() => this.handleCheck(day)}
                  checked = {this.state.checkedValues.includes(day)}
                  />
                }
                label={
                  day.toString()
                }
                labelPlacement="start"
              />
            ) 
          })
        }
        </FormGroup>
      </div>
    )
  }
}

export default withStyles(styles) Checkboxes
;
