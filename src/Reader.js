import React, { useEffect, useCallback, useState } from 'react'

export default function Reader() {

  const [tag, setTag] = useState('')
  const [buttonVisible, setVisibility] = useState('none')

  const handleReadingEvent = async event => {
    const message = event.message
    for (const record of message.records) {
      alert("Record keys:  " + Object.keys(record))
      alert("Record type:  " + record.recordType)
      alert("MIME type:    " + record.mediaType)
      alert("Record id:    " + record.id)
      switch (record.recordType) {
        case 'text':
          alert(record.data)
          setTag(record.id)
          break
        default:
          alert(record.data)
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
