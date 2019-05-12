import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import MyCheckboxes from "./myCheckboxes";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/lab/Slider";
import Chip from '@material-ui/core/Chip';
import * as moment from "moment";
import aRadio from "./radio";
import HorizontalLinearStepper from "./stepper";
import Demo from "./demo";
import MySelect from "./select";


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  paper: {
    paddingBottom: 16,
    paddingTop: 16,
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
      .spacing.unit * 5}px`
  },
  content: {
    textAlign: 'center',
    margin: 5,
    marginRight: 5,
  }
});

class AddSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("HH:mm:ss"),
      days: [1,0,0,0,0,1,1],
      duration: 15,
      route: "",
      scheduleType: "repeat",
      aSelect: "",
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      checkedDays: "",
      isEnabled: true,
      availableValues: [
        {
          value: "sun",
          label: "Sun"
        },
        {
          value: "mon",
          label: "Mon"
        },
        {
          value: "tue",
          label: "Tue"
        },
        {
          value: "wed",
          label: "Wed"
        },
        {
          value: "thu",
          label: "Thu"
        },
        {
          value: "fri",
          label: "Fri"
        },
        {
          value: "sat",
          label: "Sat"
        }
      ],
      zones: [{ name: "" }]

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  handleZoneChange = (idx) => (evt) => {
    const newZones = this.state.zones.map((zone, zidx) => {
      if (idx !== zidx) return zone;
      return { ...zone, name: evt.target.value };
    });
    this.setState({ zones: newZones });
  }

  handleZoneSubmit = (evt) => {
    const { name, zones} = this.state;
    alert(`new zone: ${name}`);
  }

  handleZoneAdd = () => {
    this.setState({
      zones: this.state.zones.concat([{name: ''}])
    });
  }

  handleCheck(day) {
    this.setState(state => ({
      checkedDays: state.checkedDays.includes(day)
        ? state.checkedDays.filter(c => c !== day)
        : [...state.checkedDays, day]
    }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // alert(value);
    // alert(name);
    this.setState({
      [name]: value
    });
  }

  handleSlider(event, value) {
    this.setState({
      duration: value
    });
  }

  setDate(date) {
    alert(date);
    this.setState({
      date: date
    });
  }

  toggleDay = (idx) => {
    const newdays = [...this.state.days];
    newdays[idx] = 1 - newdays[idx]
    this.setState({ days: newdays })
  }
  render() {
    const { classes } = this.props;

    const scheduleTypeInput = (
      <div className={classes.content}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Schedule Type</FormLabel>
        <RadioGroup
          row
          aria-label="scheduleType"
          name="scheduleType"
          className={classes.group}
          value={this.state.scheduleType}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="repeat"
            control={<Radio color="primary" />}
            label="Repeating"
            labelPlacement="start"
          />
          <FormControlLabel
            value="once"
            control={<Radio color="primary" />}
            label="One time"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
      </div>
    );


    const dateInput = (
        <div className={classes.content}>
          <FormLabel component="legend">Schedule Date</FormLabel>
          <TextField
            id="date"
            type="date"
            name="date"
            // defaultValue={this.state.date}
            value={this.state.date}
            onChange={this.handleChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
    );

    const daysInput = (
      <div className={classes.content}>
        <FormLabel component="legend">Schedule Days</FormLabel>
        <div className={classes.content}>
        { this.state.days.map((day,idx) => {
               return <Chip 
                   key={idx} 
                   label={this.state.availableDays[idx]} 
                   onClick={() => {this.toggleDay(idx)}} 
                   color={this.state.days[idx] === 1 ? 'primary' : ''}
                   className={classes.content}
                 />
          })
        }
        </div> 
      </div>
    );

    const sliderInput = (
      <div className={classes.content}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Schedule Duration (in seconds)</FormLabel>
              <div className={classes.content}>
                <Slider
                  value={this.state.duration}
                  name="duration"
                  min={1}
                  max={300}
                  step={1}
                  aria-labelledby="label"
                  onChange={this.handleSlider}
                />
                <p>
                  {this.state.duration} {this.state.duration < 2 ? "sec" : "secs"}
                </p>
              </div>
        </FormControl>
      </div>
    );

    const timeInput = (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Start Time</FormLabel>
        <TextField
          id="time"
          type="time"
          defaultValue={moment().format("HH:mm")}
          name="time"
          value={this.state.time}
          onChange={this.handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 1 // 1 sec
          }}
        />
      </FormControl>
    );

    return (
      <div className={classes.root}>
        <HorizontalLinearStepper
          steps={[
            "Choose a Schedule type",
            "When to run the schedule?",
            "Which route to water?",
            "How long to water each target zone?"
          ]}
          optional={[false, false, false, false]
          }
          open={this.props.open}
          onClose={this.props.onClose}
          name={this.props.name}
          title={this.props.title}
          onSubmit={this.props.onSubmit}
        >
          {scheduleTypeInput}
          {
            <div className={classes.content}>
              { this.state.scheduleType === "once" ? dateInput : daysInput } 
              <br/> <br/>
              {timeInput}
            </div>
            }
          {sliderInput}
          {sliderInput}
        </HorizontalLinearStepper>

        <aRadio
          name="aSelect"
          options={this.state.availableDays}
          onChange={this.handleChange}
          value={this.props.aSelect}
          legend="aRadioLegend"
        />
       {/* <p>aSelect: {this.state.aSelect}</p>
        <p>pin: {this.state.pin}</p>
        <p>duration: {this.state.duration}</p>
        <p>date: {this.state.date}</p>
        <p>scheduleType: {this.state.scheduleType}</p>
        <p>availableDays: {this.state.availableDays}</p>
        <p>checkedDays: {this.state.checkedDays}</p>

        <br />
      */}
      </div>
    );
  }
}

export default withStyles(styles)(AddSchedule);
