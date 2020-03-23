import React, { useEffect, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button';

export default function Reader(props) {

  const { setTag } = props
  const [buttonVisible, setVisibility] = useState('none')
  const [buttonText, setButtonText] = useState('Activate NFC Reader')

  const handleReadingEvent = useCallback(async event => {
    const message = event.message
    for (const record of message.records) {
      console.log("Record keys:  " + Object.keys(record))
      console.log("Record type:  " + record.recordType)
      console.log("MIME type:    " + record.mediaType)
      console.log("Record id:    " + record.id)
      switch (record.recordType) {
        case 'empty':
          setTag(fakeEvent(123456789))
          break
        case 'text':
          setTag(fakeEvent(record.id))
          break
        default:
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
          tagElement.toggleAttribute('disabled', false)
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className="ReaderButton"
        onClick={startReader}
        style={{display: buttonVisible}}
      >
      {buttonText}
      </Button>
    </div>
  )
}
