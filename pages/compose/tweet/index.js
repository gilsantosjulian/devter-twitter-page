import { useState } from "react"
import router from "next/router"
import Head from "next/head"

import { addDevit } from "api/firebase/client"
import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const ComposeTweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [imageURL, setImgURL] = useState(null)
  const user = useUser()

  console.log({ drag, task, imageURL })

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = () => {
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = () => {
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = () => {
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default ComposeTweet
