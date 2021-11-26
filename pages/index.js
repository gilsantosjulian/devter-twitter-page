import { useEffect } from "react"
import Head from "next/head"

import Avatar from "components/Avatar"
import Button from "components/Button"
import Logo from "components/Icons/Logo"

import { colors } from "styles/theme"
import GitHub from "components/Icons/Github"

import { logingWithGitHub } from "api/firebase/client"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

const Home = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleOnClick = async () => {
    await logingWithGitHub()
  }

  return (
    <>
      <Head>
        <title>devter</title>
        <link rel="icon" href="https://nextjs.org"></link>
      </Head>

      <section>
        <Logo width={100} />
        <h1>Devter</h1>
        <h2>
          Talk about development <br /> with developers
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
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
            </div>
          )}
          {user === USER_STATES.NOT_KNOW && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
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
          font-size: 32px;
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
