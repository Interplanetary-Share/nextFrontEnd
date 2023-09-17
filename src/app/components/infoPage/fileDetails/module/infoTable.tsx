/* eslint-disable @next/next/no-img-element */

import { Key, useMemo } from 'react'

import { IInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'
import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

const InfoTable = () => {
  const { size, type, createdAt, extraProperties } = useSelector(
    (state: any) => state.infoFile
  ) as IInfoFile

  const cover = useMemo(() => {
    if (extraProperties?.cover) {
      return extraProperties.cover as string
    }
    return undefined
  }, [extraProperties])

  const tags = useMemo(() => {
    if (extraProperties?.tags) {
      return extraProperties.tags as string[]
    }
    return undefined
  }, [extraProperties])

  const fields = [
    size && {
      key: 'Size',
      value: byteNormalize(size),
    },

    type && {
      key: 'Type',
      value: type,
    },

    createdAt && {
      key: 'Upload Date',
      value: format(new Date(createdAt), 'dd/MM/yyyy'),
    },
  ]

  return (
    <div className="w-full flex">
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        {cover && (
          <div className="avatar w-full">
            <div className="w-64 rounded mx-auto">
              <img src={cover} alt="cover" />
            </div>
          </div>
        )}

        <dl className="flex flex-col">
          {fields.map((field: any, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-2 my-2 align-middle justify-center "
            >
              <dt className="text-sm font-medium text-gray-500">{field.key}</dt>
              <dd className="mt-1 text-sm text-gray-900">{field.value}</dd>
            </div>
          ))}

          <div className="sm:col-span-2">
            {tags?.map((tag: string, idx: Key | null | undefined) => (
              <span
                key={idx}
                className="badge badge-outline px-2 mx-2 my-1 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </dl>
      </div>
    </div>
  )
}

export default InfoTable
