import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RadioGroup,
	FormControlLabel,
	Radio } from '@material-ui/core';

function NewProduct(props) {
  const [invetoryItem, setInvetoryItem] = useState({
    'productCategory': 'paita', 
    'size': 'XXS',
    'color': 'musta', 
  });
  const productCategories = ['paita', 'farkut', 'hame', 'mekko', 'takki'];
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['musta', 'harmaa', 'valkoinen', 'punainen', 'vihreä', 'sininen', 'keltainen', 'oranssi', 'liila', 'pinkki', 'beige', 'ruskea'];
  const originalCollectedData = ['productCategory', 'size','color', 'price', 'comments'];

  const newCollectedData = props.collectedData.filter(data => !originalCollectedData.includes(data));
  
  const classes = useStyles();

  const handleChange = (key, value) => {
    console.log(key);
    console.log(value);
    let newInventoryItem = !invetoryItem ?
      {
        [key]: value,
      }
      :
      {
        ...invetoryItem,
        [key]: value,
      }
    setInvetoryItem(newInventoryItem);
  }

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
    e.preventDefault();
    let newInventoryItem =
      {
        ...invetoryItem,
        sold: false,
      }
    props.handleAddClick(newInventoryItem);
    document.getElementById('price').value = '';
    document.getElementById('comments').value = '';
    newCollectedData.length > 0 && newCollectedData.map(data => {
      document.getElementById(data).value = '';
    })
    setInvetoryItem({});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" gutterBottom>
          Lisää uusi tuote
        </Typography>
        <form className={classes.form} noValidate >
          <Typography variant={'h5'} align={'left'}>Tuotetyyppi</Typography>
          <RadioGroup row value={invetoryItem.productCategory} className={classes.center}>
            {productCategories.map(productType => {
                return(
                    <FormControlLabel
                      key={productType} 
                      control={
                          <Radio   
                              value={productType}
                              onChange={() => handleChange('productCategory', productType)}
                              name={productType}
                          />
                      }
                      label={productType}
                    />
                )
            })}
          </RadioGroup>
          <Typography variant={'h5'} align={'left'}>Koko</Typography>
          <RadioGroup row value={invetoryItem.size} className={classes.center}>
            {sizes.map(size => {
                return(
                    <FormControlLabel
                      key={size} 
                      control={
                          <Radio   
                              value={size}
                              onChange={() => handleChange('size', size)}
                              name={size}
                          />
                      }
                      label={size}
                    />
                )
            })}
          </RadioGroup>
          <Typography variant={'h5'} align={'left'}>Väri</Typography>
          <RadioGroup row value={invetoryItem.color} className={classes.center}>
            {colors.map(color => {
                return(
                    <FormControlLabel
                      key={color} 
                      control={
                          <Radio   
                              value={color}
                              onChange={() => handleChange('color', color)}
                              name={color}
                          />
                      }
                      label={color}
                    />
                )
            })}
          </RadioGroup>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={'price'}
            label={'Price (€)'}
            name={'price'}
            onChange={(e) => UpdateChange(e)}
            type={'number'}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id={'comments'}
            label={'Lisätietoa'}
            name={'comments'}
            onChange={(e) => UpdateChange(e)}
          />
          {newCollectedData.length > 0 &&
            newCollectedData.map(data => {
              return(
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id={data}
                  label={data}
                  name={data}
                  onChange={(e) => UpdateChange(e)}
                />
              );
            })
          }
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
    marginTop: theme.spacing(2),
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


/*

*/