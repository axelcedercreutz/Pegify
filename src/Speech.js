import React, { Component } from 'react'
if (!('webkitSpeechRecognition' in window)) {
  alert("Unable to use the Speech Recognition API");
}
//-----------------SPEECH RECOGNITION SETUP---------------------
if (!('webkitSpeechRecognition' in window)) {
    //Speech API not supported here…
    console.log('wrong place');
} else { //Let’s do some cool stuff :)
    var recognition = new webkitSpeechRecognition();// eslint-disable-line no-undef
    //That is the object that will manage our whole recognition process. 
    recognition.continuous = true;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "en-US"; 
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}

//------------------------COMPONENT-----------------------------

class Speech extends Component {

  constructor() {
    super()
    this.state = {
      listening: false
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }
  
  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }
  
  handleListen(){
    // handle speech recognition here 
  }

  render() {
    return (
      <div style={container}>
        <button id='microphone-btn' style={button} onClick={this.toggleListen} />
        <div id='interim' style={interim}></div>
        <div id='final' style={final}></div>
      </div>
    )
  }
}

export default Speech;

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    button: {
      width: '60px',
      height: '60px',
      background: 'lightblue',
      borderRadius: '50%',
      margin: '6em 0 2em 0'
    },
    interim: {
      color: 'gray',
      border: '#ccc 1px solid',
      padding: '1em',
      margin: '1em',
      width: '300px'
    },
    final: {
      color: 'black',
      border: '#ccc 1px solid',
      padding: '1em',
      margin: '1em',
      width: '300px'
    }
  }
  
  const { container, button, interim, final } = styles;