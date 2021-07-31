import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <h1 className={styles.heading}>
        <a className={styles.a} href="https://nextjs.org">devter</a>
      </h1>

      <nav className={styles.nav}>
        <Link href="/timeline">timeline</Link>
      </nav>

    </>
  )
}
export default Home