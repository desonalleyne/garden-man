import React, { Component } from "react";
import Slider from "react-rangeslider";
import MySelect from './select'

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0
    };
  }

  handleOnChange = value => {
    this.setState({
      volume: value
    });
  };

  render() {
    let { volume } = this.state;
    return (
      <div>
      <MySelect
          name="pin"
          value={this.state.pin}
          onChange={this.handleChange}
          options={this.state.options}
        />
        <MySelect
          name="pin"
          value={this.state.pin}
          onChange={this.handleChange}
          options={this.state.options}
        />
      <Slider
        value={volume}
        orientation="vertical"
        onChange={this.handleOnChange}
      />
      </div>
    );
  }
}

export default VolumeSlider;
