import {
  handleDownload,
  handleShareFile,
} from '@/app/utils/fileOptions/handleOptions'

interface ICardOptionsUpper {
  cid: string
  name: string
  type: string
  link?: string // link to the blob file
}

const CardOptionsUpper = ({ cid, link, name, type }: ICardOptionsUpper) => {
  return (
    <div>
      <div className="btn-group  mt-2 w-full mx-auto justify-end absolute">
        <div
          onClick={() =>
            handleShareFile({
              cid,
              name,
            })
          }
          className="tooltip btn  btn-ghost flex align-middle justify-center"
          data-tip="Share link"
        >
          <a className="text-xl">🔗</a>
        </div>
        {link && (
          <div className="tooltip btn btn-ghost" data-tip="Download file">
            <a
              onClick={() =>
                handleDownload({
                  name,
                  link,
                  type,
                })
              }
              className="text-xl"
            >
              💾
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardOptionsUpper
