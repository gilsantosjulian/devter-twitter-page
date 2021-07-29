import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Devter Twitter App</title>
        <meta name="description" content="Tutorial to recreate Twitter web site using Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.heading}>
          Welcome to <a className={styles.anchor} href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  )
}
