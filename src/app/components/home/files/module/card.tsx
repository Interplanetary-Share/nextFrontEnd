import { useMemo, useRef, useState } from 'react'

import CardOptionsUpper from './cardOptionsUpper'
import CardStats from './cardStats'
import { IFileRetrievalResponse } from '@interplanetary-share/hooks.ipfs-client/types/file'
import Link from 'next/link'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'

const Card = (props: IFileRetrievalResponse) => {
  const { cid, name, description, type, extraProperties } = props
  const { getFile } = ipfsGalactFetchClient()

  const likes = useMemo(() => {
    if (extraProperties?.likes) {
      return extraProperties.likes as string[]
    }
    return undefined
  }, [extraProperties])

  const dislikes = useMemo(() => {
    if (extraProperties?.dislikes) {
      return extraProperties.dislikes as string[]
    }
    return undefined
  }, [extraProperties])

  const favorites = useMemo(() => {
    if (extraProperties?.favorites) {
      return extraProperties.favorites as string[]
    }
    return undefined
  }, [extraProperties])

  const cover = useMemo(() => {
    if (extraProperties?.cover) {
      return extraProperties.cover as string
    }
    return undefined
  }, [extraProperties])

  const [image, setImage] = useState('/home/space.gif')

  useMemo(() => {
    const mainFileIsImage = type?.includes('image')
    if (mainFileIsImage) {
      getFile(cid, {
        showBlobUrl: true,
        showExtraProps: false,
        showInfoFile: false,
      }).then((file: IFileRetrievalResponse) => {
        if (!file) return
        if (file.url) setImage(file.url)
      })
    } else {
      if (cover) {
        setImage(cover)
      }
    }
  }, [])

  const buttonRef = useRef(null)
  return (
    <div className="card card-compact bg-secondary shadow-xl mt-2">
      <CardOptionsUpper cid={cid} name={name} type={type} />
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          margin: '0.3em',
          borderRadius: '2em',
        }}
        className="h-72 px-4 cursor-pointer"
        onClick={() => {
          if (buttonRef.current) {
            const button = buttonRef.current as any
            button.click()
          }
        }}
      ></div>
      <div className="card-body">
        <h2 className="card-title overflow-hidden">{name}</h2>
        <p>{description}</p>
        <CardStats
          {...{
            cid,
            likes,
            dislikes,
            favorites,
          }}
        />
        <div className="card-actions justify-center gap-4">
          <Link href={'/' + cid} ref={buttonRef}></Link>
        </div>
      </div>
    </div>
  )
}

export default Card
