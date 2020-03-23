import React, { useEffect, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Reader(props) {

  const classes = useStyles()

  const { setTag } = props
  const [tagValue, setTagValue] = useState("Lue uusi klipsi")
  const [buttonVisible, setVisibility] = useState('none')
  const [buttonText, setButtonText] = useState('Aktivoi NFC')

  const handleReadingEvent = useCallback(async event => {
    const message = event.message
    for (const record of message.records) {
      console.log("Record type:  " + record.recordType)
      console.log("MIME type:    " + record.mediaType)
      console.log("Record id:    " + record.id)
      switch (record.recordType) {
        case 'empty':
          setTagValue(123456789)
          setTag(fakeEvent(123456789))
          break
        case 'text':
          setTagValue(record.id)
          setTag(fakeEvent(record.id))
          break
        default:
          setTagValue(record.id)
          setTag(fakeEvent(record.id))
          break
      }
    }
  }, [setTag])
  
  const startReader = useCallback(
    async function start() {
      if ('NDEFReader' in window) {
        try {
          const reader = new NDEFReader() // eslint-disable-line no-undef
          await reader.scan()
          reader.onerror = () => console.log('Error reading nfc tag')
          reader.onreading = handleReadingEvent
        } catch(err) {
          setButtonText("Web NFC not supported on this device. Please use Chrome Beta for android and enable flag #enable-experimental-web-platform-features")
          const tagElement = document.getElementById('tag')
          if (tagElement) {
            tagElement.toggleAttribute('disabled', false)
            setTag(fakeEvent(123456))
          }
        }
      } else {
        setButtonText("Web NFC not supported on this device. Please use Chrome Beta for android and enable flag #enable-experimental-web-platform-features")
        const tagElement = document.getElementById('tag')
        if (tagElement) {
          tagElement.toggleAttribute('readOnly', false)
        }
      }
    }, [handleReadingEvent, setButtonText, setTag])

  useEffect(() => {
    async function checkPermission() {
      const perm = await navigator.permissions.query({ name: "nfc" })
      if (perm.state === 'granted') {
        startReader()
      } else {
        setVisibility('block')
      }
    }
    checkPermission()
  } , [startReader])

  const fakeEvent = (value) => {
    return { target: { name: "tag", value } }
  }
  

  return (
    <div className="Reader">
    <Paper className={classes.paper}>
    <Typography component="h1" variant="h5">
      Klipsikoodi:
    </Typography>
    <Typography component="span" variant="body1">
    {tagValue}
    </Typography>
    <Divider variant="middle"/>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={startReader}
        style={{display: buttonVisible}}
      >
      {buttonText}
      </Button>
    </Paper>
    </div>
  )
}
