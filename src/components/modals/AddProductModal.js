import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  submit: {
    color: "white",
    backgroundColor: "#72BDA2",
    "&:hover": {
      color: "#72BDA2",
      backgroundColor: "white"
    }
  },
  root: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class AddProductModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAdd = () => {
    this.props.addProduct();
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          position: "fixed",

          top: "101px",

          left: "89vw"
        }}
      >
        <Tooltip title="Add Something...">
          <Button
            variant="contained"
            className={classes.submit}
            onClick={this.handleOpen}
          >
            Add Product
          </Button>
        </Tooltip>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div>
              {this.props.children}
              <div className={classes.root}>
                <Button
                  onClick={this.handleAdd}
                  variant="contained"
                  className={classes.submit}
                >
                  Add Product
                </Button>
                <Button variant="contained" onClick={this.handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

AddProductModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProductModal);
