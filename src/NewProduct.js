import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Reader from './Reader';

function NewProduct(props) {
  const [invetoryItem, setInvetoryItem] = useState();
  
  const classes = useStyles();

  const UpdateChange = (e) => {
    let newInventoryItem = !invetoryItem ?
      {
        [e.target.name]: e.target.name === 'price'?
          parseInt(e.target.value):
          e.target.value,
      }
      :
      {
        ...invetoryItem,
        [e.target.name]: e.target.name === 'price'?
          parseInt(e.target.value):
          e.target.value,
      }
    setInvetoryItem(newInventoryItem);
  }

  const handleSubmit = (e) => {
    let newInventoryItem =
      {
        ...invetoryItem,
        sold: false,
      }
    props.handleAddClick(newInventoryItem);
    document.getElementById('name').value = '';
    document.getElementById('size').value = '';
    document.getElementById('price').value = '';
    e.preventDefault();
    setInvetoryItem({});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add new product
        </Typography>
        <form className={classes.form} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(e) => UpdateChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="size"
            label="Size"
            id="size"
            onChange={(e) => UpdateChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price (€)"
            id="price"
            type="number"
            onChange={(e) => UpdateChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled
            name="tag"
            label="Scan NFC Tag"
            id="tag"
            type="number"
            onChange={(e) => UpdateChange(e)}
          />
          <Reader setTag={(e) => UpdateChange(e)}/>
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
  );
}


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default NewProduct;
