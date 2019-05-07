import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class MySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [(this.props.name)]: ""
    };
  }

  handleChange = event => {
    alert(event.target.name + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <Select
          value={this.props.value}
          onChange={this.props.onChange}
          displayEmpty
          name={this.props.name}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>{this.props.name}</em>
          </MenuItem>
          {this.props.options.map(option => {
            return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>;
          })}
          ;
        </Select>
        <FormHelperText>{this.props.label}</FormHelperText>
      </FormControl>
    );
  }
}

export default withStyles(styles)(MySelect);
