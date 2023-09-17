import { useMemo, useState } from 'react'

import { IFileRetrievalResponse } from '@interplanetary-share/hooks.ipfs-client/types/file'
import { IInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'
import Image from 'next/image'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const RelatedFiles = () => {
  const { cid, name, description, type, extraProperties } = useSelector(
    (state: any) => state.infoFile as IInfoFile
  )
  const { getFiles } = ipfsGalactFetchClient()
  const [relatedFiles, setRelatedFiles] = useState<IFileRetrievalResponse[]>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const tags = useMemo(() => {
    if (extraProperties?.tags) {
      return extraProperties.tags as string[]
    }
    return undefined
  }, [extraProperties])

  useMemo(() => {
    const nameSearch = name.split(' ').map((word: string) => {
      return {
        name: {
          $regex: word,
          $options: 'i',
        },
      }
    })

    const descriptionSearch = description.split(' ').map((word: string) => {
      return {
        description: {
          $regex: word,
          $options: 'i',
        },
      }
    })

    getFiles(
      true,
      {
        showInfoFile: true,
        showExtraProps: true,
        showBlobUrl: true,
      },
      {
        filter: {
          $or: [...nameSearch, ...descriptionSearch, type && { type }],
        },
      }
    ).then((files) => {
      console.log(files, 'files  from related')
      if (!files) return
      setLoading(false)
      // delete the current file from the list
      const filteredFiles = files.filter((file) => file.cid !== cid)

      setRelatedFiles(filteredFiles)
    })
  }, [tags, name, description, type])

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-infinity loading-lg" />
      </div>
    )
  }

  return (
    <div>
      {relatedFiles?.length === 0 ? (
        'No related files'
      ) : (
        <>
          {relatedFiles?.map((file, idx) => {
            const { name, description, extraProperties, type, url } = file
            const isMainFileImage = type?.includes('image')

            const image = isMainFileImage
              ? url
              : extraProperties?.cover
              ? extraProperties.cover
              : '/home/space.gif'

            return (
              <div
                key={idx}
                onClick={() => {
                  router.push('/' + file.cid)
                }}
                className="card hover:shadow-xl hover:scale-110 cursor-pointer"
              >
                <figure className="px-5 pt-5">
                  <Image
                    src={image as string}
                    className="rounded-xl"
                    width={200}
                    height={200}
                    alt={description}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h4 className="card-title">{name}</h4>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default RelatedFiles
