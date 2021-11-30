import Devit from "components/Devit"

const DevitPage = (props) => {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

DevitPage.getInitialProps = (context) => {
  const { query } = context
  const { id } = query // id, make relation with the file that was created: status/[id]
  return fetch(`http://localhost:4000/api/devits/${id}`).then((apiResponse) => {
    console.log({ apiResponse })
    if (apiResponse.ok) return apiResponse.json()
  })
}

export default DevitPage
