import Devit from "components/Devit"

const DevitPage = (props) => {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params // id, make relation with the file that was created: status/[id]

  const apiResponse = await fetch(`http://localhost:4000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
}

// export async function getServerSideProps(context) {
//   const { params, res } = context
//   const { id } = params // id, make relation with the file that was created: status/[id]

//   const apiResponse = await fetch(`http://localhost:4000/api/devits/${id}`)
//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props }
//   }

//   if (res) {
//     res.writeHead(301, { Location: "/home" }).end()
//   }
// }

export default DevitPage
