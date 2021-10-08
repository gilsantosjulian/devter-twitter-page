import AppLayout from "components/AppLayout"
import Button from "components/Button"

// import useUser from "hooks/useUser"

const ComposeTweet = () => {
  // const user = useUser()

  return (
    <>
      <AppLayout>
        <form>
          <textarea placeholder="¿Qué está pasando?"></textarea>
          <div>
            <Button>Devitear</Button>
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
