import { useEffect, useState } from "react"
import { getDownloadURL } from "firebase/storage"
import router from "next/router"
import Head from "next/head"

import { addDevit, uploadImage } from "api/firebase/client"
import Button from "components/Button"
import useUser from "hooks/useUser"
import Avatar from "components/Avatar"

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
  const [task, setTask] = useState(null)
  const [imageURL, setImgURL] = useState(null)
  const user = useUser()

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused")
            break
          case "running":
            console.log("Upload is running")
            break
        }
      }

      const onError = (error) => {
        console.log("unsuccesfull upload")
        console.log({ error })
      }
      // eslint-disable-next-line no-unused-vars
      const onComplete = () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        console.log("onComplete")
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL)
          setImgURL(downloadURL)
        })
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imageURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = event.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
          ></textarea>
          {imageURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imageURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          cursor: pointer;
          font-size: 24px;
          left: 15px;
          height: 32px;
          position: absolute;
          top: 15px;
          width: 32px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .form-container {
          align-items: flex-start;
          display: flex;
        }

        .remove-img {
          position: relative;
        }

        form {
          padding: 10px;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
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
