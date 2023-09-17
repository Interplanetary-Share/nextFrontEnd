import { setFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const Hero = () => {
  const dispatch = useDispatch()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (!file) return

    if (file.size > 3000000000) {
      document.getElementById('Inputfile')?.click()
      return toast.error('File size is too big (max 3GB)')
    }

    dispatch(
      setFileInfo({
        name: file.name,
        file,
      })
    )

    document.getElementById('opnUploadFileModal')?.click()
  }

  return (
    <>
      <div
        className="hero min-h-12"
        style={{
          backgroundImage: `url("/home/space.gif")`,
        }}
      >
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h1 className="my-12 text-6xl font-bold">Share made simple</h1>
            <input
              id="Inputfile"
              type="file"
              className="file-input w-full max-w-xs my-6"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
