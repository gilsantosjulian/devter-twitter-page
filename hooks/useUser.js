import { onAuthStateChangedClient } from "api/firebase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
}

const useUser = () => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChangedClient(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}

export default useUser
