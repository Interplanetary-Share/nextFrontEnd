// @ts-ignore

import {
  setEmptyUserInfo,
  setUserInfo,
} from '@/app/store/slices/user/user.slice'

import { getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'

const useCheckUserInfo = () => {
  const dispatch = useDispatch()
  getAuth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUserInfo({
          id: user.uid,
          email: user.email,
          coverImg: user.photoURL,
          displayName: user.displayName,
        })
      )
    } else {
      dispatch(setEmptyUserInfo())
    }
  })
}

export default useCheckUserInfo
