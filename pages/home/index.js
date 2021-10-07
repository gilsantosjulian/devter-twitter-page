import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"

import Devit from "components/Devit"

const URL = "/api/statuses/home_timeline"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then(setTimeline)
      .catch()
  }, [])

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
        }

        section {
          padding-top: 56px;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default HomePage
