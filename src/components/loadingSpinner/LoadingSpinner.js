import React from 'react';
import Image from 'material-ui-image';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
	},
});

const LoadingSpinner = () => {
	return (
		<div>
			<Image
				onClick={() => console.log('onClick')}
				src=""
				aspectRatio={16 / 9}
			/>
		</div>
	);
};

export default withStyles(styles)(LoadingSpinner);
