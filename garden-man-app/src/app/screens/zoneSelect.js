import React, { Component } from "react";
import Slider from "@material-ui/lab/Slider";
import MySelect from './select';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

class ZoneSelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      zones: [{ name: "" }],
      options: [{
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
        }]
    };
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
  render() {

    const { classes } = this.props;
    const sliderInput = (
<div>
        <MySelect
          name="pin"
          value={this.state.pin}
          onChange={this.handleChange}
          options={this.state.options}
        />
        <p>
          {this.state.duration} {this.state.duration < 2 ? "min" : "mins"}
        </p>
        </div>
    );


    
    const zones = this.state.zones.map((zone, idx) => {
        return(
          <div>
        <Slider
          value={this.state.duration}
          name="duration"
          min={1}
          max={60}
          step={1}
          aria-labelledby="label"
          onChange={this.handleSlider}
        />
        <Slider
          value={volume}
          orientation="vertical"
          onChange={this.handleOnChange}
        />
        <button type="button"  className="small">-</button>
        </div>
        )});

    let { volume } = this.state;
    return (
      <div>
       {zones}
      </div>
    )
  }
}

export default ZoneSelect;
