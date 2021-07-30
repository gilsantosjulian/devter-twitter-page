import styles from './index.module.css'
import Link from 'next/link'

const Timeline = () => {
  return (
    <>
      <h1 className={styles.headline}>This is the timeline</h1>
      <Link href="/">Go Home</Link>
    </>
  )
}

export default Timeline