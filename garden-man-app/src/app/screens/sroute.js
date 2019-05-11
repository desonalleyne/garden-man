import React from 'react';
// import HorizontalLinearStepper from './stepper'
// import Dialog from './dialog'
// import Basic from './basic'
import axios from 'axios'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/core/styles';
import RouteTable from '../screens/RouteTable'
import RouteForm from '../screens/RouteForm'
import AlertDialog from '../screens/alertDialog'
import SuccessDialog from '../screens/successDialog'



  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  typography: ({
    aligh: 'left',
    paddingBottom: 50
  })

});


class SRoute extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      routes: [],
      routeFormVisible: false,
      feedbackDialogVisible: false,
      feedbackDialogMessage: '',
      f_id: null,
      f_name: '',
      f_description: '',
      f_source: '',
      f_target: [],
      f_passthrough: [],
      editOrAdd: 'add',
      nz: ''
    }

    this.toggleRouteForm = this.toggleRouteForm.bind(this)
    this.toggleChip = this.toggleChip.bind(this)
    this.toggleChipSingle = this.toggleChipSingle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleFeedbackDialog = this.toggleFeedbackDialog.bind(this)
    this.populateForm = this.populateForm.bind(this)
  };

  componentDidMount(){
    axios.all([
      axios.get('http://localhost:5000/zone'),
      axios.get('http://localhost:5000/route')
    ])
    .then(axios.spread( (_zones, _routes) =>  {
      console.log(_zones) 
      const routes = _routes.data.map(route =>{
        return route
      })
      const zones = _zones.data.map(zone =>{
        return zone
      })

      this.setState({routes: routes, zones: zones})
      })
  )};

  toggleRouteForm (){
    this.setState({routeFormVisible: !this.state.routeFormVisible})
  }

  toggleChip = (id, category) => {
    var tmp = [...this.state[category]]

    var idx = this.state[category].indexOf(id)
    if (idx === -1){
      tmp.push(id)
    }else{
      tmp.splice(idx, 1)
    }
    this.setState({[category]: tmp})
  }

  toggleChipSingle = (id, category) => {
    this.setState({[category]: id})
  }

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

  toggleFeedbackDialog(message){
    this.setState({feedbackDialogVisible: !this.state.feedbackDialogVisible, feedbackDialogMessage: message})
  }

  populateForm = (route) => {
    this.setState({
      f_id: route.id,
      f_name: route.name,
      f_description: route.description,
      f_source: route.source_zone.id, 
      f_passthrough: route.passthrough_group.zones.map( (zone) => {return zone.id} ), 
      f_target: route.target_group.zones.map( zone => {return zone.id} ),
      editOrAdd: 'edit' 
    })
    this.toggleRouteForm()
  }

  addRoute = () => {
    this.setState({editOrAdd: 'add'})
    this.toggleRouteForm()
  }

  deleteRoute = () => {

  }


  addOrEditRoute = () => {
    const route = {
      id: this.state.f_id, 
      name: this.state.f_name,
      description: this.state.f_description,
      source_zone: this.state.f_source,
      target_group: this.state.f_target,
      passthrough_group: this.state.f_passthrough
    }
    
      console.log(this.state.routes)
      axios({

        method: this.state.editOrAdd === 'add' ? 'post' : 'put',
        url: 'http://0.0.0.0:5000/route',
        data: route
      })
      .then((resp) => {
        console.log(resp)
        if (this.state.editOrAdd === 'add'){
          this.setState({routes: [...this.state.routes, resp.data]})
        }else{
          this.setState({routes: this.state.routes.map( (r) => {
              if (r.id === resp.data.id){
                return resp.data
              }else{
                return r
              }
          })
          })
        }
        console.log(this.state.routes)
        this.toggleFeedbackDialog("Route successfully " + (this.state.editOrAdd === "add" ? "added" : "editted"))
        this.toggleRouteForm()
      })
      .catch(error => {
        this.toggleFeedbackDialog('Route not ' + (this.state.editOrAdd === 'add' ? "added. " : "editted. ") + error)
        console.log(error)
      })
    
  }
  render(){
    return (
      <div>
        <Typography variant="headline" align="left">Configure Routes</Typography>
        <Typography variant="caption"  align="left">Combine zones together to make watering paths</Typography>
         <br />
        <Divider variant="middle" />
         <br />
        <Button align="right" onClick={this.addRoute} color='secondary' variant="contained">Add Route</Button>
        
        <RouteTable 
          routes={this.state.routes}
          populateForm={this.populateForm}
          deleteRoute={this.deleteRoute}
        /> 
        
        <AlertDialog 
            name='alertDialog'
            title={this.state.editOrAdd === 'add' ? "Add Route" : "Edit Route"}
            content={
              <RouteForm
                zones={this.state.zones} 
                toggleChip={this.toggleChip} 
                toggleChipSingle={this.toggleChipSingle} 
                f_name={this.state.f_name}
                f_description={this.state.f_description}
                f_source={this.state.f_source}
                f_passthrough={this.state.f_passthrough} 
                f_target={this.state.f_target}
                onChange={this.handleChange}
              /> 
            }
            open={this.state.routeFormVisible}
            onClose={this.toggleRouteForm}
            onSubmit={this.addOrEditRoute}
        />
        

        <SuccessDialog 
          open={this.state.feedbackDialogVisible} 
          onClose={() => {this.toggleFeedbackDialog()}} 
          title={this.state.editOrAdd === 'add' ? 'Add Route' : 'Edit Route'}
          content={this.state.feedbackDialogMessage}>  
        </SuccessDialog>


      </div>
    )
  }
}

export default withStyles(styles)(SRoute);
