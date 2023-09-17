import { ITag, calculateTagsPerPage } from '@/app/utils/misc/tags'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Badge from '@/app/components/general/badge/badge'
import numberNormalized from '@/app/utils/misc/numberNormalized'
import { setFileTags } from '@/app/store/slices/files/query.slice'
import useWindowsSize from '@/app/hooks/custom/useWindowsSize'

const FileTags = () => {
  const { getFilesListResponse, selectedTags } = useSelector(
    (state: any) => state.allFiles
  )
  const dispatch = useDispatch()

  const fileTags = useMemo(() => {
    return getFilesListResponse
      .reduce((acc: any, file: any) => {
        if (!file.extraProperties) return acc
        if (!file.extraProperties.tags) return acc

        const { tags = [] } = file.extraProperties
        tags.forEach((tag: any) => {
          const index = acc.findIndex((item: any) => item.name === tag)
          if (index === -1) {
            acc.push({
              name: tag,
              numberPosts: 1,
            })
          } else {
            acc[index].numberPosts += 1
          }
        })
        return acc
      }, [])
      .sort((a: any, b: any) => b.numberPosts - a.numberPosts)
  }, [getFilesListResponse])

  const size = useWindowsSize()
  const tagsContainer = useRef() as React.RefObject<HTMLInputElement>
  const [tagsPerPage, setTagsPerPage] = useState([] as Array<Array<ITag>>)

  useEffect(() => {
    setTagsPerPage(
      calculateTagsPerPage({
        widthCharater: 25,
        maxWith: tagsContainer.current?.clientWidth,
        tags: fileTags,
      })
    )
  }, [size, fileTags])

  const CustomBadge = (props: { tags?: Array<ITag> | undefined }) => {
    const { tags = [] } = props

    return (
      <div className="carousel-item h-32 flex justify-center pt-10">
        {tags.map((tag) => {
          const { name, numberPosts } = tag

          const defaultBtnClass =
            'w-full my-2 badge badge-outline text-3xl p-5 mx-1 hover:bg-white cursor-pointer '
          const activeBtnClass = defaultBtnClass + ' bg-white text-primary'

          return (
            <div key={name} className="indicator">
              <span className="indicator-item indicator-center badge badge-primary ">
                {numberNormalized(numberPosts)}
              </span>
              <Badge
                name={name}
                onClick={() => {
                  dispatch(setFileTags(name) as any)
                }}
                className={
                  selectedTags.includes(name) ? activeBtnClass : defaultBtnClass
                }
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div
        ref={tagsContainer}
        className="grid bg-base-100 h-72 md:h-32 carousel carousel-vertical rounded-box w-full mx-auto"
      >
        {tagsPerPage.map((tags, index) => {
          return <CustomBadge key={index} tags={tags} />
        })}
      </div>
    </>
  )
}

export default FileTags
