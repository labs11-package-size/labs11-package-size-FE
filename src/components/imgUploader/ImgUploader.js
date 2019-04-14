import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import sha1 from 'sha1';

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
	state = {
		images: [],
	};

	handleUpload = files => {
		const image = files[0];

		const cloudName = 'dlrdfp08e';
		const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

		const timestamp = Date.now() / 1000;
		const uploadPreset = 'hptnjfow';

		const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}asrCpeXIyrttdOCMBw3lvJxwL0A`;

		const signature = sha1(paramsStr);
		const params = {
			api_key: '768737499725874',
			timestamp: timestamp,
			upload_preset: uploadPreset,
			signature: signature,
		};

		let uploadRequest = superagent.post(url);
		uploadRequest.attach('file', image);

		Object.keys(params).forEach(key => {
			uploadRequest.field(key, params[key]);
		});

		uploadRequest.end((err, res) => {
			if (err) {
				alert(err);
				return;
			}
			console.log(`UPLOAD COMPLETE:${JSON.stringify(res.body)}`);
			const uploaded = res.body;
			this.props.addImgs(uploaded);

			let updatedImages = Object.assign([], this.state.images);
			updatedImages.push(uploaded);

			this.setState({
				images: updatedImages,
			});
		});
	};

	deleteImg = event => {
		this.props.deleteImgFromProdList(event.target.id);

		let updatedImages = Object.assign([], this.state.images);
		updatedImages.splice(event.target.id, 1);

		this.setState({
			images: updatedImages,
		});
	};
	render() {
		const list = this.state.images.map((image, i) => {
			return (
				<Card key={image.signature} className={this.props.classes.media}>
					<img
						onClick={this.deleteImg}
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
					{this.state.images.length !== 0 ? <>{list}</> : null}

					<Dropzone onDrop={this.handleUpload}>
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

export default withStyles(styles)(ImgUploader);
