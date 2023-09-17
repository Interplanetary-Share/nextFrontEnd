import { useDispatch, useSelector } from 'react-redux'

import { TagsInput } from 'react-tag-input-component'
import { setFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice'
import { toast } from 'react-toastify'

const FormUpload = () => {
  const { name, description } = useSelector((state: any) => state.uploadFile)
  const dispatch = useDispatch()

  return (
    <>
      <label className="label mt-8">
        <span className="label-text">File Name:</span>
      </label>
      <input
        type="text"
        placeholder="Name of the file"
        className="input input-bordered w-full"
        defaultValue={name}
        onChange={(e) => {
          dispatch(setFileInfo({ name: e.target.value }))
        }}
      />
      <label className="label mt-8">
        <span className="label-text">File Description:</span>
      </label>
      <textarea
        placeholder="File Description"
        defaultValue={description}
        className="textarea textarea-bordered textarea-lg w-full "
        onChange={(e) => {
          dispatch(setFileInfo({ description: e.target.value }))
        }}
      ></textarea>
      <label className="label mt-8">
        <span className="label-text">File Categorization:</span>
      </label>
      <TagsInput
        beforeAddValidate={(tag: string) => {
          if (tag.includes(' ')) {
            toast.error('Tags cannot contain spaces')
            return false
          }
          return true
        }}
        onChange={(tags: string[]) => {
          dispatch(setFileInfo({ tags: tags }))
        }}
        name="tags"
        placeHolder="enter tags"
      />
    </>
  )
}

export default FormUpload
