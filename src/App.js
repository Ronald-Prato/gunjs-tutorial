import React, { useEffect, useState } from 'react'
import './App.css'
import { gun } from './gun'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [localMessage, setLocalMessage] = useState('')
  const [messageList, setMessageList] = useState({})
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    gun
      .get('Workbench')
      .get('messages')
      .map()
      .on((message) => {
        setShowList(false)
        const newMessages = messageList
        newMessages[message.id] = message

        setMessageList(newMessages)
        setShowList(true)
      })
  }, [])

  const onChangeMessage = (event) => {
    const value = event.target.value
    setLocalMessage(value)
  }

  const onSend = (event) => {
    event && event.preventDefault()

    const uid = uuidv4()

    const newMessage = {
      id: uid,
      message: localMessage,
    }

    gun.get('Workbench').get('messages').set(newMessage)
    setLocalMessage('')
  }

  return (
    <div className="main-wrapper">
      <h1>Send a message</h1>
      <form onSubmit={onSend}>
        <input value={localMessage} onChange={onChangeMessage} />
        <button onClick={onSend}>Enviar</button>
      </form>

      <h2> Messages history </h2>
      {showList &&
        Object.values(messageList).map((m) => {
          return <p key={m.id}>{m.message}</p>
        })}
    </div>
  )
}

export default App
