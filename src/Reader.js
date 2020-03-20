import React, { useEffect, useCallback, useState } from 'react'

export default function Reader() {

  const [tag, setTag] = useState('')
  const [buttonVisible, setVisibility] = useState('none')
  const [log, appendLog] = useState([])

  const handleReadingEvent = async event => {
    const message = event.message
    for (const record of message.records) {
      appendLog(log.push("Record type:  " + record.recordType))
      appendLog(log.push("MIME type:    " + record.mediaType))
      appendLog(log.push("Record id:    " + record.id))
      switch (record.recordType) {
        case 'text':
          appendLog(log.push(record.data))
          break
        default:
          appendLog(log.push(record.data))
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
      <ul>
        {log.map((el) => <li>{el}</li>)}
      </ul>
    </div>
  )
}
