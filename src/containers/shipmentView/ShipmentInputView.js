import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ShipmentInput from '../../components/shipment/ShipmentInput';

const ShipmentInputView = props => {
	return <ShipmentInput product={props.product} />;
};

export default ShipmentInputView;
