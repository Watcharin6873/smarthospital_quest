import React, { useState, useEffect } from 'react'
import useGlobalStore from '../store/global-store'
import { currentAdmin } from '../api/Auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRoteAdmin = ({element}) => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [ok, setOk] = useState(false)
  console.log('pAdmin: ', user, token)

  useEffect(() => {
    if (user.role && token) {
      //send to back
      currentAdmin(token)
        .then(res => {
          setOk(true)
        })
        .catch(err => {
          console.log(err)
          setOk(false)
        })
    }
  }, [])

  return ok ? element : <LoadingToRedirect />
}

export default ProtectRoteAdmin