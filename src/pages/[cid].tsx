import { useDispatch, useSelector } from 'react-redux'

import Comments from '@/app/components/infoPage/comments/comments'
import Container from '@/app/components/general/containers/container'
import FileDatils from '@/app/components/infoPage/fileDetails/fileDatils'
import FileOptions from '@/app/components/infoPage/fileOptions/fileOptions'
import Image from 'next/image'
import UserComments from '@/app/components/infoPage/comments/userComments'
import { updateInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const InfoPage = () => {
  const router = useRouter()
  const { cid } = router.query
  const { fileFound } = useSelector((state: any) => state.infoFile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateInfoFile({ cid: cid as string }))
  }, [cid])

  if (fileFound === undefined)
    return <span className="loading loading-infinity loading-lg"></span>

  return (
    <Container>
      {fileFound ? (
        <>
          <FileDatils />
          <FileOptions />
          <Comments />
          <UserComments />
        </>
      ) : (
        <div className="w-full mx-auto pt-8">
          <Image
            width={500}
            height={500}
            className="h-96 rounded-md mx-auto pt-8"
            src="https://media4.giphy.com/media/mPytjcsG3XS4o/giphy.gif?cid=ecf05e47yi7kpab2e0pjl4u5946u8rda6bx4p09c4rlhjyke&rid=giphy.gif&ct=g"
            alt="404"
          />
        </div>
      )}
    </Container>
  )
}

export default InfoPage
