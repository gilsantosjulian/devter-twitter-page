import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'

import { colors } from '../styles/theme'
import GitHub from '../components/Icons/github'

const Home = () => {
  return (
    <>
      <Head>
        <title>devter</title>
        <link rel='icon' href="https://nextjs.org"></link>
      </Head>

      <AppLayout>
        <section>
          <Image src='/devter-logo.png' alt='logo' width={120} height={120} />
          <h1>Devter</h1>
          <h2>Talk about development <br /> with developers</h2>

          <div>
            <Button onClick={() => {}}>
              <GitHub width={25} height={25} fill={'#fff'}/>
              <span>Login with github</span>
            </Button>
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