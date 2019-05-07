import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import Basic from './basic'

  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class Step1 extends React.Component{
  constructor(props){
    super(props);

    this.state = {scheduleType: "init"};
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event){
    console.log(event.currentTarget.value)
    this.setState({
      scheduleType: event.target.value
    });
  }
  render(){

    const { classes } = this.props;
    return (
      <div>
        <button value="once" name="one" onClick={this.handleClick} variant="contained" color="primary" className={classes.button}>
          One time
        </button> 
           <span> </span>
        <button value="repeating" name="two" onClick={this.handleClick} variant="contained" color="primary" className={classes.button}>
          Repeating
        </button>   
        {this.state.scheduleType} 
    </div>
    )
  }
}

export default withStyles(styles)(Step1);
