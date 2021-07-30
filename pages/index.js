import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

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
          <a className={styles.a} href="https://nextjs.org">devter</a>
        </h1>

        <nav className={styles.nav}>
          <Link href="/timeline">timeline</Link>
        </nav>
      </main>
    </div>
  )
}
