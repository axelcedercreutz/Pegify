import React, { useEffect, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button';

export default function Reader(setTag) {

  const [buttonVisible, setVisibility] = useState('none')

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
        const reader = new NDEFReader() // eslint-disable-line no-undef
        await reader.scan()
        reader.onerror = () => console.log('Error reading nfc tag')
        reader.onreading = handleReadingEvent
      } else {
        setTag("Web NFC not supported on this device. Please use Chrome Beta for android and enable flag #enable-experimental-web-platform-features")
        document.getElementById('tag').toggleAttribute('disabled', false)
      }
    }, [handleReadingEvent, setTag])

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
    return { target: { name: "Tag", value } }
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
        Activate NFC Reader
      </Button>
    </div>
  )
}
