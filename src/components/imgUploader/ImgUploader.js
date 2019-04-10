import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import sha1 from 'sha1';

const styles = theme => ({
	container: {
		margin: 10,
		width: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	media: {
		padding: 5, // 16:9
	},
	actions: {
		display: 'flex',
	},
});

class ImgUploader extends Component {
	// handleDrop = acceptedFiles => {
	// 	console.log(acceptedFiles);
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		const binaryStr = reader.result;
	// 		const img = Base64.encode(binaryStr);
	// 		// this.props.addThumbnail(img);
	// 	};
	// 	acceptedFiles.forEach(file => reader.readAsBinaryString(file));
	// };

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
			this.props.addThumbnail(uploaded);

			let updatedImages = Object.assign([], this.state.images);
			updatedImages.push(uploaded);

			this.setState({
				images: updatedImages,
			});
		});
	};

	deleteImg = event => {
		event.preventDefault();

		let updatedImages = Object.assign([], this.state.images);
		updatedImages.splice(event.target.id, 1);

		this.setState({
			images: updatedImages,
		});
	};
	render() {
		const list = this.state.images.map((image, i) => {
			let count = 1;
			return (
				<li key={i}>
					<img
						onClick={this.deleteImg}
						className={this.props.classes.media}
						id={++count}
						style={{ width: 100 }}
						src={image.secure_url}
						alt="product"
					/>
				</li>
			);
		});
		return (
			<div className={this.props.classes.container}>
				<Typography variant="h6" gutterBottom>
					Upload Images
				</Typography>
				<ol>{list}</ol>
				<Dropzone onDrop={this.handleUpload}>
					{({ getRootProps, getInputProps }) => (
						<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<Typography variant="subheading" gutterBottom>
									<Button>Click or drop images to upload.</Button>
								</Typography>
							</div>
						</section>
					)}
				</Dropzone>
			</div>
		);
	}
}

export default withStyles(styles)(ImgUploader);
