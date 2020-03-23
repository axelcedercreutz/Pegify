import React, { useState } from 'react';
import {
	FormGroup,
	FormControlLabel,
	Checkbox,
	makeStyles,
	Button,
	CssBaseline,
	Container,
	Typography,
	TextField
} from '@material-ui/core';

function Settings(props) {
    const handleChange = (data) => {
			props.handleDeleteFromCollectedData(data);
    }
		const originalCollectedData = ['productCategory', 'size','color', 'price', 'comments'];
		const [newClass, setNewClass] = useState();

    const classes = useStyles();
    const UpdateChange = (e) => {
			setNewClass(e.target.value);
    }

    const handleSubmit = (e) => {
        props.handleAddToCollectedData(newClass);
        document.getElementById('new').value = '';
        e.preventDefault();
        setNewClass({});
    }
	const allAddedForms = () => {
		return (
			<FormGroup row className={classes.center}>
					{props.collectedData.map(data => {
							return(
									<FormControlLabel
										key={data} 
										control={
												<Checkbox   
														checked={props.collectedData.includes(data)}
														onChange={() => handleChange(data)}
														name={data}
														disabled={originalCollectedData.includes(data) }
												/>
										}
										label={data}
									/>
							)
					})}
			</FormGroup>
		);
	}

	const addNew = () => {
		return(
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Add new class
					</Typography>
					<form className={classes.form} noValidate >
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="new"
							label="New class"
							name="new"
							autoFocus
							onChange={(e) => UpdateChange(e)}
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							type="submit"
							onClick={(e) => handleSubmit(e)}
						>
							Add
						</Button>
					</form>
				</div>
			</Container>
		)
	}

  return (
		<>
			{addNew()}
			<div className={classes.center}>
				{allAddedForms()}
			</div>
		</>
  );
}

const useStyles = makeStyles(theme => ({
    center: {
				margin: '0 auto',
				display: 'flex',
				alignContent: 'center',
    }
  }));

export default Settings;
