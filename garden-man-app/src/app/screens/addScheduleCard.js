import React, { Component } from 'react';
import HorizontalLinearStepper from './stepper';
import Demo from './demo';
import ZoneSelect from './zoneSelect';
import Dialog from './dialog';
import { withStyles } from '@material-ui/core/styles';
import Step1 from './addScheduleCardSteps';

  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


  class AddScheduleCard extends React.Component{
  render(){

    const { classes } = this.props;
    return (
      <div>
        <HorizontalLinearStepper 
          steps={['Choose a Schedule type', 'When should the schedule run?', 'Which zones should be watered', 'How long should each zone be watered?']}
          optional={[true, true, false, false]}
         >  
           <Step1 name={"schedule type..."}/>
           <Demo name={"when?..."}/>
           <Demo name={"Which zones?..."}/>
           <Demo name={"How long?"}/>
        </HorizontalLinearStepper>  
        <ZoneSelect
      </div>
    )
  }
}

export default withStyles(styles)(AddScheduleCard);
