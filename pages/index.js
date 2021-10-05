import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import AppLayout from "../components/AppLayout"
import Button from "../components/Button"
import Avatar from "../components/Avatar"

import { colors } from "../styles/theme"
import GitHub from "../components/Icons/github"

import { logingWithGitHub, onAuthStateChangedClient } from "../firebase/cilent"

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChangedClient(setUser)
  }, [])

  const handleOnClick = async () => {
    setUser(await logingWithGitHub())
  }

  console.log({ user })

  return (
    <>
      <Head>
        <title>devter</title>
        <link rel="icon" href="https://nextjs.org"></link>
      </Head>

      <AppLayout>
        <section>
          <Image src="/devter-logo.png" alt="logo" width={120} height={120} />
          <h1>Devter</h1>
          <h2>
            Talk about development <br /> with developers
          </h2>

          <div>
            {user === undefined && (
              <Button onClick={handleOnClick}>
                <GitHub width={25} height={25} fill={"#fff"} />
                <span>Login with github</span>
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
export default Home
