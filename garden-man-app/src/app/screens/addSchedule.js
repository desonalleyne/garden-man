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
  }
});

class AddSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("HH:mm:ss"),
      duration: 15,
      aSelect: "",
      pin: "",
      scheduleType: "repeat",
      availableDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      checkedDays: "",
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

  render() {
    const { classes } = this.props;

    const checkboxes = this.state.availableDays.map(day => {
      return (
        <Checkbox
          label={day}
          key={day.toString()}
          onChange={() => this.handleCheck(day)}
          checked={this.state.checkedDays.includes(day)}
        />
      );
    });

    const daysInput = (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Schedule Days</FormLabel>
        <MyCheckboxes
          handleCheck={this.handleCheck}
          availableValues={this.state.availableValues}
          checked={this.state.checkedDays}
        />
      </FormControl>
    );

    const scheduleTypeInput = (
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
    );

    const dateInput = (
      <FormControl component="fieldset" className={classes.formControl}>
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
      </FormControl>
    );

 


    const sliderInput = (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Schedule Duration </FormLabel>
        {this.state.zones.map((zone, idx) => {
          return (
            <div>
              <Slider
                value={this.state.duration}
                name="duration"
                min={1}
                max={60}
                step={1}
                aria-labelledby="label"
                onChange={this.handleSlider}
              /><MySelect
                name="pin"
                value={this.state.pin}
                onChange={this.handleChange}
                options={this.state.availableValues}
              />
              <p>
                {this.state.duration} {this.state.duration < 2 ? "min" : "mins"}
              </p>
              <button type="button"  className="small">-</button>
            </div>
          )})}
      </FormControl>
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
            "When should the schedule run?",
            "Which zones should be watered",
            "How long should each zone be watered?"
          ]}
          optional={[false, false, false, false]}
        >
          {scheduleTypeInput}
          {this.state.scheduleType === "once" ? (
            <div>
              {dateInput}
              <br />
              <br />
              {timeInput}
            </div>
          ) : (
            <div>
              {daysInput}
              <br />
              <br />
              {timeInput}
            </div>
          )}
          {sliderInput}
          <Demo name={"How long?"} />
        </HorizontalLinearStepper>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <aRadio
          name="aSelect"
          options={this.state.availableDays}
          onChange={this.handleChange}
          value={this.props.aSelect}
          legend="aRadioLegend"
        />
        <p>aSelect: {this.state.aSelect}</p>
        <p>pin: {this.state.pin}</p>
        <p>duration: {this.state.duration}</p>
        <p>date: {this.state.date}</p>
        <p>scheduleType: {this.state.scheduleType}</p>
        <p>availableDays: {this.state.availableDays}</p>
        <p>checkedDays: {this.state.checkedDays}</p>

        <br />
      </div>
    );
  }
}

export default withStyles(styles)(AddSchedule);
