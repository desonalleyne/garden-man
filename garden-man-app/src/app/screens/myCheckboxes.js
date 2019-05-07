import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  checkboxRoot: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checkboxChecked: {}
});

class MyCheckboxes extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    // const { classes } = this.props;
    return (
      <FormGroup row>
        <FormLabel component="legend">{this.props.label}</FormLabel>

        {this.props.availableValues.map(item => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  label={item.value}
                  key={item.value.toString()}
                  onChange={() => this.props.handleCheck(item.value)}
                  color="primary"
                  checked={this.props.checked.includes(item.value)}
                />
              }
              label={item.label}
              labelPlacement="start"
            />
          );
        })}
      </FormGroup>
    );
  }
}
export default withStyles(styles)(MyCheckboxes);
