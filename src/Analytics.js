import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Card,
	CardContent
} from '@material-ui/core';

function Analytics(props) {

	const classes = useStyles();

	const analyticsCard = (data, header) => {
		const isSold = header === 'Sold';
		const count = isSold ?
			data.map(inventoryItem => !inventoryItem.sold).length :
			data.map(inventoryItem => inventoryItem.sold);

		const value = isSold ?
			data.map(inventoryItem => !inventoryItem.sold)
				.reduce((a,b) => a + b, 0) :
			data.map(inventoryItem => inventoryItem.sold)
				.reduce((a,b) => a + b, 0);
		return(
			<Card>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{header}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Amount
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{count}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Value
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{count}
					</Typography>
				</CardContent>
			</Card>
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
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default Analytics;