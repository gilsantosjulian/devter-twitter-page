import Avatar from "components/Avatar"

const Devit = ({ avatar, content, createdAt = "", key, userName }) => {
  return (
    <>
      <article key={key}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <date>{createdAt}</date>
          </header>

          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default Devit
