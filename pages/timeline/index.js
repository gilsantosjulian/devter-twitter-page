import styles from "./index.module.css"
import Link from "next/link"

const Timeline = ({ userName }) => {
  return (
    <>
      <h1 className={styles.headline}>This is the timeline of {userName}</h1>
      <Link href="/">Go Home</Link>
    </>
  )
}

Timeline.getInitialProps = () => {
  // could be a promise
  const url = "http://localhost:3000/api/hello"
  return fetch(url).then((res) => res.json())
}

export default Timeline
