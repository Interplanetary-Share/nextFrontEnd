import {
  IComments,
  updateInfoFile,
} from '@/app/store/slices/infoFile/infoFile.slice'
import { useDispatch, useSelector } from 'react-redux'

import { format } from 'date-fns'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import numberNormalized from '@/app/utils/misc/numberNormalized'
import { toast } from 'react-toastify'
import { userNeedLogin } from '@/app/utils/misc/modalsToggle'

const UserComments = () => {
  const dispatch = useDispatch()
  const { extraProperties, cid } = useSelector((state: any) => state.infoFile)
  const { id: userId } = useSelector((state: any) => state.user)
  const { updateFile } = ipfsGalactFetchClient()

  const defaultStatsClass = 'stat-value mx-auto'

  const defaultBtnClass = 'btn btn-ghost text-2xl w-8'
  const defaultReportBtnClass = 'tooltip btn pt-1 m-4 '

  const handleDeleteComment = async (commentId: string) => {
    if (!userId) userNeedLogin()
    const file = await updateFile(cid, {
      extraProperties: {
        comments: extraProperties?.comments?.filter(
          (comment: IComments) => comment.id !== commentId
        ),
      },
    })
    dispatch(
      updateInfoFile({
        extraProperties: file.extraProperties,
      })
    )
    toast.success('Comment deleted successfully')
  }

  const handleLikeComment = async (commentId: string) => {
    if (!userId) return userNeedLogin()
    if (!extraProperties?.comments) return toast.error('Comment not found')

    const commentToEdit = extraProperties?.comments?.find(
      (comment: IComments) => comment.id === commentId
    )
    if (!commentToEdit) return toast.error('Comment not found')

    const comments = [...extraProperties?.comments]

    const newCommentToEdit = structuredClone(commentToEdit)

    if (newCommentToEdit.likes.includes(userId)) {
      newCommentToEdit.likes = newCommentToEdit.likes.filter(
        (like: string) => like !== userId
      )
    } else {
      newCommentToEdit.likes.push(userId)
    }

    const newComments = [
      ...comments.filter((comment: IComments) => comment.id !== commentId),
    ]
    newComments.unshift(newCommentToEdit)

    const file = await updateFile(cid, {
      extraProperties: {
        comments: newComments,
      },
    })
    dispatch(
      updateInfoFile({
        extraProperties: file.extraProperties,
      })
    )
    toast.success('Comment liked successfully')
  }

  const comments = extraProperties?.comments

  return (
    <div className="md:w-2/3 p-4">
      <ul role="list" className="divide-y divide-gray-200">
        {comments &&
          comments.map((comment: IComments, idx: number) => {
            const commentInHtml = Buffer.from(comment.comment, 'hex').toString(
              'utf8'
            )

            const likedBtnClass = comment.likes.includes(userId)
              ? defaultBtnClass + 'btn-active'
              : defaultBtnClass

            return (
              <li key={comment.id} className="py-4">
                <div className="flex space-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-14 w-14 md:h-24 md:w-24 lg:w-32 lg:h-32 rounded-full"
                    src={comment.coverImg}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        {comment.displayName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {comment.date &&
                          format(Number(comment.date), 'dd/MM/yyyy HH:mm:ss')}
                      </p>
                    </div>
                    <div
                      className="text-md bg-white p-4 color-none text-black rounded-md shadow-md"
                      dangerouslySetInnerHTML={{ __html: commentInHtml }}
                    ></div>
                    <div className="stats shadow w-30">
                      <div className="stat">
                        <div className="stat-title">
                          <a
                            className={likedBtnClass}
                            onClick={() => handleLikeComment(comment.id)}
                          >
                            😍
                          </a>
                        </div>
                        <div className={defaultStatsClass}>
                          {numberNormalized(comment.likes.length)}
                        </div>
                      </div>
                    </div>

                    {comment.userId === userId && (
                      <div
                        onClick={() => handleDeleteComment(comment.id)}
                        className={defaultReportBtnClass}
                        data-tip="Delete comment"
                      >
                        <a className="text-xl">🗑</a>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default UserComments
