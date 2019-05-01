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
    if (!!this.props.success) {
      return <Redirect to='/shipments' />
    }
    if (!!this.props.failure) {
      alert("Error: Package addition failed, please click OK to return to products list.")
      return <Redirect to='/products' />
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
    success: state.shipmentsReducer.success,
    failure: state.shipmentsReducer.failure
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
