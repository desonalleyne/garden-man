import React from 'react';
// import HorizontalLinearStepper from './stepper'
// import Dialog from './dialog'
// import Basic from './basic'
import AddSchedule from './addSchedule'
import { withStyles } from '@material-ui/core/styles';


  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class Schedules extends React.Component{
  render(){

    // const { classes } = this.props;
    return (
      <div>
       <AddSchedule/>
    </div>
    )
  }
}

export default withStyles(styles)(Schedules);
