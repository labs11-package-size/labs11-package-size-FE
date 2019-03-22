import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		maxWidth: 250,
		margin: 20,
	},
	media: {
		height: 140,
	},
	cardContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	mainContainer: {
		maxWidth: 1100,
	},
};

const Dashboard = props => {
	const { classes } = props;
	return (
		<div className={classes.mainContainer}>
			<Typography gutterBottom variant="h5" component="h2">
				Products
			</Typography>
			<section className={classes.cardContainer}>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg" // product image
							title="image title"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Product Name: 3 inch knife
							</Typography>
							<Typography component="p">
								Description: A small knife set
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							View Details
						</Button>
					</CardActions>
				</Card>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg" // product image
							title="image title"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Product Name: 3 inch knife
							</Typography>
							<Typography component="p">
								Description: A small knife set
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							View Details
						</Button>
					</CardActions>
				</Card>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg" // product image
							title="image title"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Product Name: 3 inch knife
							</Typography>
							<Typography component="p">
								Description: A small knife set
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							View Details
						</Button>
					</CardActions>
				</Card>
				<Button size="small" color="primary">
					See All Products
				</Button>
			</section>

			<Typography gutterBottom variant="h5" component="h2">
				Shipments
			</Typography>
			<div className={classes.cardContainer}>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg" // product image
							title="image title"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Customer Name:
							</Typography>
							<Typography component="p">Destination City:</Typography>
							<Typography component="p">Product Name:</Typography>
							<Typography component="p">Shipment Date:</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							View Details
						</Button>
					</CardActions>
				</Card>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg" // product image
							title="image title"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Customer Name:
							</Typography>
							<Typography component="p">Destination City:</Typography>
							<Typography component="p">Product Name:</Typography>
							<Typography component="p">Shipment Date:</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							View Details
						</Button>
					</CardActions>
				</Card>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg" // product image
							title="image title"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Customer Name:
							</Typography>
							<Typography component="p">Destination City:</Typography>
							<Typography component="p">Product Name:</Typography>
							<Typography component="p">Shipment Date:</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							View Details
						</Button>
					</CardActions>
				</Card>
				<Button size="small" color="primary">
					See All Shipments
				</Button>
			</div>
		</div>
	);
};

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
