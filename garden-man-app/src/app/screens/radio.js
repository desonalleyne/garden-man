import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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

class aRadio extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <p>hello world</p>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{this.props.legend}</FormLabel>
          <RadioGroup
            row
            aria-label={this.props.name}
            name={this.props.name}
            className={classes.group}
            value={this.props.value}
            onChange={this.props.onChange}
          >
            {this.props.options.map(option => {
              return (
                <FormControlLabel
                  value="repeat"
                  control={<Radio color="primary" />}
                  label="Repeating"
                  labelPlacement="start"
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(aRadio);
