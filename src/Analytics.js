import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	makeStyles
} from '@material-ui/core';

function Analytics(props) {

	const classes = useStyles();

	const analyticsCard = (data, header) => {
		const isSold = header === 'Sold';
		const count = !isSold ?
			data.filter(inventoryItem => !inventoryItem.sold).length :
			data.filter(inventoryItem => inventoryItem.sold).length;

		const value = !isSold ?
			data.filter(inventoryItem => !inventoryItem.sold)
				.map(inventoryItem => inventoryItem.price)
				.reduce((a,b) => a + b, 0) :
			data.filter(inventoryItem => inventoryItem.sold)
				.map(inventoryItem => inventoryItem.price)
				.reduce((a,b) => a + b, 0);
		return(
			<>
				<Card className={classes.root} raised={true}>
					<CardContent>
						<Typography className={classes.title} color="primary" gutterBottom>
							{header}
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							Amount: {count}
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							Value: {value.toString()}€
						</Typography>
					</CardContent>
				</Card>
			</>
		)
	}

  return (
    <>
			{analyticsCard(props.inventory, 'In store')}
			{analyticsCard(props.inventory, 'Sold')}
    </>
  );
}

const useStyles = makeStyles({
  root: {
		width: '18%',
		margin: '2%',
		display: 'inline-block',
		['@media screen and (max-width: 960px)']: {
			width: 200,
			margin: 20,
		}
  },
  title: {
    fontSize: 18,
  },
});

export default Analytics;