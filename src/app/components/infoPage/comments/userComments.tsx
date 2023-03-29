/* eslint-disable @next/next/no-img-element */
import { IComments } from '@/app/store/slices/infoFile/infoFile.slice';
import {
  fetchDeleteComment,
  fetchGetComments,
} from '@/app/store/slices/infoFile/infoFileComments.action';
import numberNormalized from '@/app/utils/misc/numberNormalized';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

const UserComments = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state: any) => state.infoFile);
  const { id: userId } = useSelector((state: any) => state.user);

  const defaultStatsClass = 'stat-value mx-auto';

  const defaultBtnClass = 'btn btn-ghost text-2xl ';
  const defaultReportBtnClass = 'tooltip btn pt-1 m-4 ';

  const handleDeleteComment = (commentId: string) => {
    dispatch(fetchDeleteComment({ commentId }) as any)
      .unwrap()
      .then(() => {
        dispatch(fetchGetComments() as any).unwrap();
      });
  };

  return (
    <div className="md:w-2/3 p-4">
      <ul role="list" className="divide-y divide-gray-200">
        {comments &&
          comments.map((comment: IComments, idx: number) => {
            const commentInHtml = Buffer.from(comment.comment, 'hex').toString(
              'utf8'
            );

            const likedBtnClass = comment.likes.includes(userId)
              ? defaultBtnClass + 'btn-active'
              : defaultBtnClass;

            const dislikedBtnClass = comment.dislikes.includes(userId)
              ? defaultBtnClass + 'btn-active'
              : defaultBtnClass;

            const reportsBtnClass = comment.dislikes.includes(userId)
              ? defaultReportBtnClass + 'btn-active'
              : defaultReportBtnClass;

            return (
              <li key={comment._id} className="py-4">
                <div className="flex space-x-3">
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
                        {format(new Date(comment.date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div
                      className="text-md bg-white p-4 color-none text-black rounded-md shadow-md"
                      dangerouslySetInnerHTML={{ __html: commentInHtml }}
                    ></div>
                    {/* <div className="stats shadow w-64">
                      <div className="stat">
                        <div className="stat-title">
                          <a className={likedBtnClass}>😍</a>
                        </div>
                        <div className={defaultStatsClass}>
                          {numberNormalized(comment.likes.length)}
                        </div>
                      </div>

                      <div className="stat">
                        <div className="stat-title">
                          <a className={dislikedBtnClass}>🤮</a>
                        </div>
                        <div className={defaultStatsClass}>
                          {numberNormalized(comment.dislikes.length)}
                        </div>
                      </div>
                    </div>
                    <div className={reportsBtnClass} data-tip="Report comment">
                      <a className="text-xl">🚩</a>
                    </div> */}
                    {comment.userId === userId && (
                      <div
                        onClick={() => handleDeleteComment(comment._id)}
                        className={defaultReportBtnClass}
                        data-tip="Delete comment"
                      >
                        <a className="text-xl">🗑</a>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserComments;
