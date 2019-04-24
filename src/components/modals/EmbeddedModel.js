import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  ModelContainer: {
    width: "575px",
    height: "575px",
    [theme.breakpoints.down("md")]: {
      width: "400px",
      height: "400px",
    }
  }
});

const Iframe = props => {
  const { source } = props;
  const { classes } = props;

  if (!source) {
    return <div>Loading...</div>;
  }
  const src = source;
  return (
    <div className={classes.ModelContainer}>
      <iframe style={{ width: "100%", height: "100%" }} src={src} />
    </div>
  );
};

export default withStyles(styles)(Iframe);
