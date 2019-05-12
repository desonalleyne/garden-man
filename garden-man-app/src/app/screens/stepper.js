import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
    position: 'sticky',
    bottom: 0,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  content: {
    textAlign: 'center',
  }

});

// function getSteps() {
//   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
// }

// function __getStepContent(step) {
//   switch (step) { 
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     default:
//       return 'Unknown step';
//   }
// }

function getStepContent(step, children){
 return React.Children.map(children, (child, index)=>{
    if (step === index){
      return React.cloneElement(child, child.props) 
    }
  })
}
class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional = step => {
    return this.props.optional[step];
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }


  render() {
    const { classes } = this.props;
    const steps = this.props.steps;
    const { activeStep } = this.state;

    return (
      <Dialog 
          className={classes.root}
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth='sm'>
        <DialogTitle>   
          <DialogTitle id="scroll-dialog-title">{this.props.title}</DialogTitle>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </DialogTitle>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
          <div>
            <DialogContent>
              <Typography className={classes.instructions}>{getStepContent(activeStep, this.props.children)}</Typography>
            </DialogContent>

            <DialogActions className={classes.content}>
              <Button className={classes.content}
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {this.isStepOptional(activeStep) && (
                <Button className={classes.content}
                  variant="contained"
                  color="primary"
                  onClick={this.handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              {activeStep === steps.length - 1 ? 
              <Button className={classes.content}
                variant="contained"
                color="primary"
                onClick={this.props.onSubmit}
                className={classes.button}
              >Save
              </Button>
               : ''
              }

              {activeStep != steps.length - 1 ? 
              <Button className={classes.content}
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
              > 
                Next
              </Button>
              : ''
            }
            </DialogActions>
          </div>
          )}
      </Dialog>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLinearStepper);