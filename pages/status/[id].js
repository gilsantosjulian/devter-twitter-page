import Devit from "components/Devit"

import { firestore } from "api/firebase/admin"
import { useRouter } from "next/router"

const DevitPage = (props) => {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando ...</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2v6O59t32Pr9Kxt1cykC" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  try {
    const response = await firestore.collection("devits").doc(id).get()
    const data = response.data()
    const { createdAt, userId } = data
    const props = {
      ...data,
      id: userId,
      createdAt: +createdAt.toDate(),
    }

    return { props }
  } catch (error) {
    console.log(error)
  }

  // return firestore
  //   .collection("devits")
  //   .doc(id)
  //   .get()
  //   .then((doc) => {
  //     const data = doc.data()
  //     const id = doc.id
  //     const { createdAt } = data

  //     const props = {
  //       ...data,
  //       id,
  //       createdAt: +createdAt.toDate(),
  //     }
  //     return { props }
  //   })
  //   .catch(() => {
  //     return { props: {} }
  //   })
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
