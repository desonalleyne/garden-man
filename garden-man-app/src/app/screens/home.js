import React from 'react';

import { withStyles } from '@material-ui/core/styles';


  const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class Home extends React.Component{
  render(){

    return (
      <div>
        <h2>Hello from Home</h2>    
    </div>
    )
  }
}

export default withStyles(styles)(Home);
