import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";

const styles = theme => ({
  root: {
    width: "auto",
    display: "flex",
    flexWrap: "wrap"
  }
});

class LoadingSpinner extends React.Component {

  renderRedirect = () => {
    if (this.props.success) {
      return <Redirect to='/shipments' />
    }
  }

  render() {
    return (
      <div>
	  {this.renderRedirect()}
        <CircularProgress />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.shipmentsReducer.success
  };
};

export default compose(
  withRouter(
    connect(
      mapStateToProps,
      null
    )(withStyles(styles)(LoadingSpinner))
  )
);
