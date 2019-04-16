import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
})

const DeletePopover = ({ classes }) => (
  <PopupState variant="popover" popupId="demoPopover">
    {popupState => (
      <div>
        <Button variant="contained" {...bindTrigger(popupState)}>
          Delete
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
            <Typography variant="h6" id="modal-title">
				Are you sure you want to delete?
            </Typography>
            {/* <div>
                <div className={classes.root}>
                    <Button
                        onClick={props.delete}
                        variant="contained"
                        className={classes.submit}>
                        Delete
                    </Button>
                    <Button variant="contained" onClick={props.handleClose}>
                        Cancel
                    </Button>
                </div>
            </div> */}
        </Popover>
      </div>
    )}
  </PopupState>
)

DeletePopover.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DeletePopover)