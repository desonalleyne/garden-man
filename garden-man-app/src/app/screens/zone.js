import React from "react";
// import HorizontalLinearStepper from "./stepper";
//import Dialog from "./dialog";
import MySelect from "./select";
// import AddSchedule from "./addSchedule";
import AlertDialog from "./alertDialog";
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
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
// import SaveIcon from '@material-ui/icons/Save';
// import classNames from 'classnames';
import axios from 'axios';

import ZoneTable from './ZoneTable'
import ZoneForm from './ZoneForm'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  paper: {
    textAlign: 'left',
    padding: theme.spacing.unit * 5,
    paddingLeft: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 10
  },
  buttonBox: {
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit * 1
  }
});

class Zone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      category: "",
      pin: "",
      options: [],
      feedbackDialogVisible: false,
      feedbackDialogMessage: '',
      zoneFormVisible: false,
      zones: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClickOpen = this.handleClickOpen.bind(this);
    this.hideZoneForm = this.hideZoneForm.bind(this);
    this.showZoneForm = this.showZoneForm.bind(this);
    this.showFeedbackDialog = this.showFeedbackDialog.bind(this);
    this.addZone = this.addZone.bind(this);
    this.deleteZone = this.deleteZone.bind(this);
    this.editZone = this.editZone.bind(this);
  }

  componentDidMount(){
    axios.all([
      axios.get('http://localhost:5000/pin/free'),
      axios.get('http://0.0.0.0:5000/zone')
    ])
    .then(axios.spread((_pins, _zones) => {
        const options = _pins.data.map(option => {
          return {'label': option.name, 'value': option.number};
        })
        const zones = _zones.data;
        this.setState({zones});
        this.setState({options});
      }));
    }

  showZoneForm = (name) => {
    console.log("showZoneForm called")
    console.log(name.target.name)
    this.setState({ zoneFormVisible: true });
  };

  hideZoneForm(){
    console.log("hideZoneForm called")
    this.setState({ zoneFormVisible: false });
    console.log(this.state)
    // this.showFeedbackDialog('test message');
  };

  hideFeedbackDialog = () => {
    this.setState({ feedbackDialogVisible: false });
  };

  showFeedbackDialog(message) {
    console.log("handle success")
    this.setState({feedbackDialogVisible: true, feedbackDialogMessage: message});
  };

  handleChange(event) {
    const target = event.target;
    // console.log(target)
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name.toLowerCase()]: value
    });
    // console.log(this.state);
  }
  
  addZone(event){
    const zone = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category, 
      pin: this.state.pin
    }
    console.log(zone);
    axios({
      method: 'post',
      url: 'http://0.0.0.0:5000/zone',
      data: {zone}
    })
    .then(res => {
      this.showFeedbackDialog('Added zone ' + this.state.name)
      console.log(res);
      this.hideZoneForm();
      zone.id = this.state.zones.length + 1
      this.setState({zones: [...this.state.zones,zone] })
      console.log(res.data);
    })
    .catch(error => {
      this.showFeedbackDialog('Error adding zone ' + error)
      console.log(error)
    })
  }

  deleteZone(zoneId){
    const zones = this.state.zones.filter(function(zone){
      return zone.pin != zoneId
    })

    this.setState({zones})
  }
  
  editZone(zone){
    this.setState({id: zone.id, name: zone.name, description: zone.description, pin: zone.pin, category: zone.category, zoneFormVisible: true} )
  }


  handleSubmit(event){
    // alert("im clicked")
    this.addZone(event)
  }

  render() {
    const { classes } = this.props;
    const addZoneContent = (
      <div>
          <TextField
            required
            id="name"
            name="name"
            value={this.state.name}
            label="Zone Name"
            placeholder="Zone Name"
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
          />

          <br />
          <br />

          <TextField
            id="description"
            name="description"
            value={this.state.description}
            label="Description"
            placeholder="Description"
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <br />              
          <MySelect
            name="Pin"
            label="Choose a pin number"
            value={this.state.pin}
            onChange={this.handleChange}
            options={this.state.options}
          />
          <br />
          <br />
          <br />
          <br />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Zone Category</FormLabel>
              <RadioGroup
                row
                aria-label="category"
                name="category"
                className={classes.group}
                value={this.state.category}
                onChange={this.handleChange}
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
  
    return (
      <div>
        <Typography variant="headline" align="left">Configure Zones</Typography>
        <Typography variant="caption"  align="left">Configure water control units/valves</Typography>
         <br />
        <Divider variant="middle" />
         <br />
        <SuccessDialog 
          open={this.state.feedbackDialogVisible} 
          onClose={this.hideFeedbackDialog} 
          title='Add Zone' 
          content={this.state.feedbackDialogMessage}>  
        </SuccessDialog>

        <Button onClick={this.showZoneForm} color='secondary' variant="contained">Add Zone</Button>
        <AlertDialog 
            name='alertDialog'
            title="Add Zone"
            content={
              <ZoneForm 
                name={this.state.name} 
                description={this.state.description}
                pin={this.state.pin}
                handleChange={this.handleChange}
                options={this.state.options}
                category={this.state.category}
              />
            }
            open={this.state.zoneFormVisible}
            onClose={this.hideZoneForm}
            onSubmit={this.handleSubmit}
          />
          
        
      <ZoneTable  zones={this.state.zones} deleteZone={this.deleteZone} editZone={this.editZone} />
      </div>
    );
  }
}

export default withStyles(styles)(Zone);
