import React from 'react';
// import HorizontalLinearStepper from './stepper'
// import Dialog from './dialog'
// import Basic from './basic'
import AddSchedule from './addSchedule';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../screens/alertDialog';
import axios from 'axios';


  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class Schedules extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scheduleFormVisible: false,
      routes: []
    }


    this.toggleScheduleForm = this.toggleScheduleForm.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:5000/schedule')
    .then((resp) => {
      this.setState({routes: resp.data})
    })
  }

  toggleScheduleForm = () => {
    this.setState({scheduleFormVisible: !this.state.scheduleFormVisible})
  }
  render(){

    // const { classes } = this.props;
    return (
      <div>
        <Button align="right" onClick={this.toggleScheduleForm} color='secondary' variant="contained">Add Schedule</Button>
        <AddSchedule
          name='alertDialog'
          title="Add Schedule"
          open={this.state.scheduleFormVisible}
          onClose={this.toggleScheduleForm}
          onSubmit={this.toggleScheduleForm}
          routes={this.state.routes}
          >  
        </AddSchedule>
    </div>
    )
  }
}

export default withStyles(styles)(Schedules);
