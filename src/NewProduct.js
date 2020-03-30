import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RadioGroup,
	FormControlLabel,
	Radio } from '@material-ui/core';

  if (!('webkitSpeechRecognition' in window)) {
    //Speech API not supported here…
    console.log('wrong place');
  } else { //Let’s do some cool stuff :)
    var recognition = new webkitSpeechRecognition();// eslint-disable-line no-undef
    //That is the object that will manage our whole recognition process. 
    recognition.continuous = true;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "fi-FI"; 
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
  }


function NewProduct(props) {
  const defaultInvetoryItem = {
    'productCategory': 'paita', 
    'size': 'XXS',
    'color': 'musta',
    'model': 'unisex', 
  };
  const [invetoryItem, setInvetoryItem] = useState(defaultInvetoryItem);
  const [listening, setListening] = useState(false);
  const productCategories = ['paita', 'farkut', 'hame', 'mekko', 'takki'];
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['musta', 'harmaa', 'valkoinen', 'punainen', 'vihreä', 'sininen', 'keltainen', 'oranssi', 'liila', 'pinkki', 'beige', 'ruskea'];
  const models = ['unisex', 'nainen', 'mies'];
  const originalCollectedData = ['model','productCategory', 'size','color', 'price', 'comments'];

  const newCollectedData = props.collectedData.filter(data => !originalCollectedData.includes(data));
  
  const classes = useStyles();

  useEffect(() => {
    handleListen();
  }, [listening])

  const toggleListen = () => {
    setListening(!listening);
  }

  const handleListen = () => {
    console.log('listening?', listening);

    if (listening) {
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = '';
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      document.getElementById('comments').innerHTML = finalTranscript;
    }
  }

  const handleChange = (key, value) => {
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
    console.log(e.keycode);
    e.preventDefault();
    let newInventoryItem =
      {
        ...invetoryItem,
        sold: false,
        comments: document.getElementById('comments').innerHTML,
      }
    props.handleAddClick(newInventoryItem);
    document.getElementById('price').value = '';
    document.getElementById('comments').value = '';
    document.getElementById('comments').innerHTML = '';
    newCollectedData.length > 0 && newCollectedData.map(data => {
      document.getElementById(data).value = '';
    })
    setInvetoryItem(defaultInvetoryItem);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" gutterBottom>
          Lisää uusi tuote
        </Typography>
          <Typography variant={'h5'} align={'left'}>Malli</Typography>
          <RadioGroup row value={invetoryItem.model} className={classes.center}>
            {models.map(model => {
                return(
                    <FormControlLabel
                      key={model} 
                      control={
                          <Radio   
                              value={model}
                              onChange={() => handleChange('model', model)}
                              name={model}
                          />
                      }
                      label={model}
                    />
                )
            })}
          </RadioGroup>
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
            label={'Hinta (€)'}
            name={'price'}
            onChange={(e) => UpdateChange(e)}
            type={'number'}
          />
          <Typography variant={'h5'} align={'left'}>Lisätietoja</Typography>
          <div className={classes.rowFlex}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => toggleListen()}
            >
              {listening ? 'Lopeta' : 'Nauhoita'} 
            </Button>
            <div id='comments' className={classes.final} onClick={() => toggleListen()}></div>
          </div>
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
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </Button>
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
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  rowFlex: {
    width: '100%', // Fix IE 11 issue.
    margin: '0 auto',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  }
}));

export default NewProduct;
