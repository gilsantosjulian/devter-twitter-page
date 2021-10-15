import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"

import { fetchLatestDevits } from "api/firebase/client"
import Devit from "components/Devit"
import useUser from "hooks/useUser"

// const URL = "/api/statuses/home_timeline"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(async () => {
    user && (await fetchLatestDevits().then(setTimeline))
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit, index) => (
            <Devit
              key={`devit-${index}`}
              username={devit.username}
              avatar={devit.avatar}
              message={devit.message}
            />
          ))}
        </section>

        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          position: sticky;
          border-bottom: 1px solid #ccc;
          display: flex;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default HomePage
