import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Pdf from './pdf'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import { updateInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'

const randomMessage = () => {
  const messages = [
    'Loading... Please wait patiently while we summon the magical internet dragons.',
    "Loading... It's like waiting for a sloth to cross the road.",
    "Loading... Grab a cup of coffee, sit back, and relax. We'll be ready soon.",
    "Loading... Don't worry, we're not just sitting around playing Tetris.",
    "Loading... It's taking longer than we thought. Maybe we should have fed the hamsters before they started running in their wheels.",
    "Loading... We're counting backwards from infinity. It might take a while.",
    'Loading... Our tech team is currently performing a rain dance to speed things up.',
    "Loading... It's like waiting for a snail to finish a marathon.",
    "Loading... Our hamsters have gone on a coffee break. They'll be back soon.",
    'Loading... Our code monkeys are typing as fast as they can. Please be patient.',
    "Loading... Our servers are currently playing a game of 'hide and seek'. They'll be back soon.",
    "Loading... We're almost there, just need to give the electrons a little push.",
    "Loading... It's like waiting for a turtle to finish a marathon.",
    "Loading... Our team of highly-trained squirrels is working on it. They'll be done soon.",
    'Loading... Please wait while we perform some high-tech wizardry.',
  ]
  const random = Math.floor(Math.random() * messages.length)
  return messages[random]
}

const WrapperFileType = () => {
  const [loading, setLoading] = React.useState(true)
  const { cid, url, type } = useSelector((state: any) => state.infoFile)
  const { getFile } = ipfsGalactFetchClient()
  const dispatch = useDispatch()

  useEffect(() => {
    getFile(cid, {
      showBlobUrl: true,
      showExtraProps: false,
      showInfoFile: false,
    }).then((file: any) => {
      if (!file) return
      if (file.url) {
        setLoading(false)
        dispatch(
          updateInfoFile({
            url: file.url,
          })
        )
      }
    })
  }, [cid])

  if (loading)
    return (
      <div className="grid grid-cols-1 w-full h-full px-2 mx-2  bg-secondary">
        <p className="text-lg py-2">{randomMessage()}</p>
      </div>
    )

  if (type.includes('image')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="image" className="w-full max-h-screen h-auto" />
    )
  }

  if (type.includes('video')) {
    return <video src={url} controls className="w-full max-h-screen h-auto" />
  }

  if (type.includes('audio')) {
    return <audio className="w-full max-h-screen h-auto" src={url} controls />
  }

  if (type.includes('text')) {
    return <iframe src={url} className="w-full h-screen" />
  }

  if (type.includes('pdf')) {
    return <Pdf url={url} />
  }

  // if (type.includes('application')) {
  //   return <div>Application</div>
  // }

  // add model 3d viewer

  return (
    <div>
      <p>File type not supported yet</p>
      <p>File type: {type}</p>
      <p>
        Sry for the inconvenience, we are working on it. you can still download
        the file.
      </p>
      <hr />
      <iframe src={url} className="w-full h-screen" />
    </div>
  )
}

export default WrapperFileType
