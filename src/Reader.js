import React, { useEffect, useCallback, useState } from 'react'

export default function Reader() {

  const [tag, setTag] = useState('')
  const [buttonVisible, setVisibility] = useState('none')

  const handleReadingEvent = async event => {
    const message = event.message
    for (const record of message.records) {
      console.log("Record type:  " + record.recordType);
      console.log("MIME type:    " + record.mediaType);
      console.log("Record id:    " + record.id);
      switch (record.recordType) {
        case 'text':
          console.log(record.data)
          break
        default:
          console.log(record.data)
          setTag(record.id)
          break
      }
    }
  }

  
  
  const startReader = useCallback(
    async function startReaderr() {
      if ('NDEFReader' in window) {
        const reader = new NDEFReader() // eslint-disable-line no-undef
        await reader.scan()
        reader.onerror = () => console.log('Error reading nfc tag')
        reader.onreading = handleReadingEvent
      } else {
        setTag("Cannot read NFC, not supported")
      }
    }, [])

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
  

  return (
    <div className="Reader">
      <button
        className="ReaderButton"
        onClick={startReader}
        style={{display: buttonVisible}}
      >
        Activate NFC Reader
      </button>
      <span>{tag}</span>
    </div>
  )
}
