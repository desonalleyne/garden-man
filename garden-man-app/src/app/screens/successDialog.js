import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class SuccessDialog extends React.Component {


  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={false}
          maxWidth='sm'
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained"  onClick={this.props.onClose} color="primary" autoFocus >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SuccessDialog;