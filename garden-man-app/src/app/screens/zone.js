import React from "react";
//import Dialog from "./dialog";
import MySelect from "./select";
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
      prevPin: "",
      options: [],
      feedbackDialogVisible: false,
      feedbackDialogMessage: '',
      zoneFormVisible: false,
      zones: [],
      addOrEdit: 'add'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClickOpen = this.handleClickOpen.bind(this);
    this.toggleZoneForm = this.toggleZoneForm.bind(this);
    this.showFeedbackDialog = this.showFeedbackDialog.bind(this);
    this.addZone = this.addZone.bind(this);
    this.addOrEditZone = this.addOrEditZone.bind(this);
    this.deleteZone = this.deleteZone.bind(this);
    this.editZone = this.editZone.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.updatePins = this.updatePins.bind(this);
  }

  componentDidMount(){
    axios.all([
      axios.get('http://localhost:5000/pin'),
      axios.get('http://0.0.0.0:5000/zone')
    ])
    .then(axios.spread((_pins, _zones) => {
      console.log(_zones, _pins)
        const options = _pins.data.map(option => {
          return {'label': option.name, 'value': option.number, 'is_free': option.is_free};
        })
        const zones = _zones.data;
        this.setState({zones});
        this.setState({options});
      }));
    }

  toggleZoneForm = () => {
    this.setState({ zoneFormVisible: !this.state.zoneFormVisible });
  };

  updatePins = () =>{
    axios.get('http://localhost:5000/pin')
    .then((resp) => {
      const options = resp.data.map(option => {
          return {'label': option.name, 'value': option.number, 'is_free': option.is_free};
      })
      console.log("updating pins")
      console.log(resp.data)
      this.setState({options});
    })
  }

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
  
  clearForm = () => {
    this.setState(
        {
          id: "",
          name: "",
          description: "",
          category: "",
          pin: ""
        })
  }

  addZone(){
    this.setState({addOrEdit: 'add'})
    this.clearForm()
    this.toggleZoneForm()
  }

  addOrEditZone(event){
    const zone = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      category: this.state.category, 
      pin: this.state.pin
    }
    this.state.addOrEdit === 'add' ? delete zone.id: alert('edit')
    console.log(zone);
    axios({
      method: this.state.addOrEdit === 'add' ? 'post' : 'put',
      url: 'http://0.0.0.0:5000/zone',
      data: zone
    })
    .then(resp => {
      console.log(resp)
      this.clearForm();
      this.toggleZoneForm();
      this.updatePins();

      
      if (this.state.addOrEdit === 'add'){
        this.setState({zones: [...this.state.zones, resp.data]})
      }else{
        this.setState({zones: this.state.zones.map( (r) => {
          if (r.id === resp.data.id){
            return resp.data
          }else{
            return r
          }
        })})
      }

      this.showFeedbackDialog(this.state.name + (this.state.addOrEdit === 'add' ? ' added' : ' editted'))

      // zone.id = this.state.zones.length + 1
      // this.setState({zones: [...this.state.zones,zone] })
    })
    .catch(error => {
      this.showFeedbackDialog('Cannot complete action: ' + error)
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
    console.log(zone)
    this.updatePins()
    this.setState({id: zone.id, name: zone.name, description: zone.description, pin: zone.pin, prevPin: zone.pin, category: zone.category,addOrEdit:'edit'} )
    this.toggleZoneForm()
  }


  handleSubmit(event){
    this.addOrEditZone(event)
  }

  render() {
    const { classes } = this.props;
  
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
          title={this.state.addOrEdit === 'add' ? "Add Zone" : "Edit Zone" } 
          content={this.state.feedbackDialogMessage}>  
        </SuccessDialog>

        <Button onClick={this.addZone} color='secondary' variant="contained">Add Zone</Button>
        <AlertDialog 
            name='alertDialog'
            title={this.state.addOrEdit === 'add' ? "Add Zone" : "Edit Zone" } 
            content={
              <ZoneForm 
                name={this.state.name} 
                description={this.state.description}
                pin={this.state.pin}
                prevPin={this.state.prevPin}
                handleChange={this.handleChange}
                options={this.state.options}
                category={this.state.category}
              />
            }
            open={this.state.zoneFormVisible}
            onClose={this.toggleZoneForm}
            onSubmit={this.handleSubmit}
          />
          
        
      <ZoneTable  zones={this.state.zones} deleteZone={this.deleteZone} editZone={this.editZone} />
      </div>
    );
  }
}

export default withStyles(styles)(Zone);
