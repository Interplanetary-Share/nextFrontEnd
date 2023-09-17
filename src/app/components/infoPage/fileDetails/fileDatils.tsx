import { IInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'
import RightDetailsWrapper from './module/rightDetailsWrapper'
import WrapperFileType from '@/app/utils/previewFile/wrapperFileType'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const FileDatils = () => {
  const { name, description } = useSelector(
    (state: any) => state.infoFile
  ) as IInfoFile

  const [hideDetails, setHideDetails] = useState(false)

  const detailsClass = hideDetails
    ? 'w-0 h-0 opacity-0 fixed'
    : 'sm:w-32 md:w-64 lg:w-72 xl:w-96 px-16 xl:px-4'

  const detailsClass2 = hideDetails
    ? 'w-0 h-0 opacity-0 fixed'
    : 'overflow-y-auto overflow-x-hidden relative mb-24 lg:fixed z-10 flex flex-row items-baseline justify-center gap-3 h-5/6 w-full lg:w-64 xl:w-96 mr-1 xl:mr-4 xxl:mr-8  card bg-base-300 rounded-box px-2 pb-4 menu bg-base-200 right-0 top-24 '

  return (
    <>
      <div className="mt-8 top "></div>
      <div className="flex   flex-col lg:flex-row align-baseline md:flex w-full px-2 mx-2">
        <div className="grid h-full flex-grow card bg-base-300 rounded-box place-items-center py-4 w-full">
          <h1 className="text-2xl font-bold py-4">{name}</h1>
          <p className="text-lg mb-2 py-1 text-left w-full px-4">
            {description}
          </p>
          <WrapperFileType />
        </div>
        <div className="divider divider-horizontal text-3xl text-center  w-16">
          <button onClick={() => setHideDetails(!hideDetails)}>
            {hideDetails ? '🙈' : '🙉'}
          </button>
        </div>
        <div className={detailsClass}></div>
      </div>
      <ul className={detailsClass2}>
        <RightDetailsWrapper />
      </ul>
    </>
  )
}

export default FileDatils
