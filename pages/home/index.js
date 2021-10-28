import AppLayout from "components/AppLayout"
import Link from "next/link"
import { useEffect, useState } from "react"

import { fetchLatestDevits } from "api/firebase/client"
import Devit from "components/Devit"
import Create from "components/icons/Create"
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
          {timeline.map(
            ({ avatar, content, createdAt, id, userId, userName }) => (
              <Devit
                avatar={avatar}
                content={content}
                createdAt={createdAt}
                key={id}
                id={id}
                userId={userId}
                userName={userName}
              />
            )
          )}
        </section>

        <nav>
          <Link href="/compose/tweet">
            <a>
              <Create height={32} width={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
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

        section {
          flex: 1;
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
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
      `}</style>
    </>
  )
}

export default HomePage
