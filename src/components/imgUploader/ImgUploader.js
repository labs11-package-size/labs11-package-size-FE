import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import {
	uploadImgs,
	deleteImgFromProdList,
} from '../../store/actions/productActions';

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = theme => ({
	container: {
		marginTop: 30,
		padding: 8,
		width: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	media: {
		margin: 8,
		maxWidth: 100,
	},
	actions: {
		display: 'flex',
	},
});

class ImgUploader extends Component {
	handleUpload = async file => {
		this.props.uploadImgs(file);
	};

	deleteImg = id => {
		this.props.deleteImgFromProdList(id);
	};

	render() {
		const list = this.props.images.map(image => {
			return (
				<Card key={image.signature} className={this.props.classes.media}>
					<img
						onClick={() => this.deleteImg(image.public_id)}
						id={image.signature}
						style={{ width: 100 }}
						src={image.secure_url}
						alt="product"
					/>
				</Card>
			);
		});
		return (
			<Paper className={this.props.classes.container}>
				<div>
					<Typography variant="h6" gutterBottom>
						Upload Images
					</Typography>
					{this.props.images.length !== 0 ? <>{list}</> : null}

					<Dropzone onDrop={file => this.handleUpload(file)}>
						{({ getRootProps, getInputProps }) => (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<Typography variant="subheading" gutterBottom>
									Click or drop images to upload.
								</Typography>
							</div>
						)}
					</Dropzone>
				</div>
			</Paper>
		);
	}
}

const mapStateToProps = state => {
	return {
		images: state.productsReducer.images,
		thumbnail: state.productsReducer.thumbnail,
	};
};
export default compose(
	connect(
		mapStateToProps,
		{ uploadImgs, deleteImgFromProdList },
	)(withStyles(styles)(ImgUploader)),
);
