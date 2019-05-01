import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";


const LoadingSpinner = () => {
	return (
		<div style={{width: "90px", height: "61px", display: "flex", justifyContent: "center", alignItems: "center"}}>
		<CircularProgress style={{width: "90px", height: "61px"}}/>
		</div>
	);
};

export default LoadingSpinner;
