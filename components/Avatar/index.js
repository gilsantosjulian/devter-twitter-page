import styles from "./styles.module.css"

const Avatar = ({ alt, src, text }) => {
  return (
    <div className={styles.container}>
      <img alt={alt} className={styles.avatar} src={src} title={alt} />
      {text && <strong>{text || alt}</strong>}
    </div>
  )
}

export default Avatar
