/* eslint-disable @next/next/no-sync-scripts */
import {
  fetchCreateComment,
  fetchGetComments,
} from '@/app/store/slices/infoFile/infoFileComments.action';
import { userNeedLogin } from '@/app/utils/misc/modalsToggle';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '../../general/avatar/avatar';
import './hideTinyMsg.css';

const Comments = () => {
  const { id: userId } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const editorRef = useRef(null) as any;

  const handleCreateComment = async () => {
    if (!userId || userId === '') {
      userNeedLogin();
      return;
    }

    const commentInHTML = await editorRef.current.getContent().trim();
    const commmentInText = await editorRef.current
      .getContent({
        format: 'text',
      })
      .trim();

    if (commentInHTML.length > 1000 || commmentInText.length > 1000) {
      toast.error('Comment must be less than 1000 characters long');
      return;
    }

    if (commentInHTML.includes('script')) {
      toast.error('Comment must not include script tag');
      return;
    }

    if (!(commentInHTML.includes('iframe') || commentInHTML.includes('img'))) {
      if (
        !commentInHTML ||
        !commmentInText ||
        commentInHTML.length < 10 ||
        commmentInText.length < 10
      ) {
        toast.error('Comment must be at least 10 characters long');
        return;
      }
    }

    const commentInHex = Buffer.from(commentInHTML).toString('hex');
    dispatch(
      fetchCreateComment({
        comment: commentInHex,
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        dispatch(fetchGetComments() as any);
        editorRef.current.setContent('');
      });
  };

  return (
    <>
      <div className="bg-secondary rounded-lg md:w-2/3 ">
        <div className="ml-4 p-4 h-50 pb-0 mb-0 flex gap-4">
          <div className="w-32 mt-8">
            <Avatar size=" w-32 h-32 " />
          </div>
          <div className="w-full h-full">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={``}
              init={{
                height: 175,
                menubar: false,
                plugins: [
                  ' imagetools advlist link image charmap print preview anchor visualblocks a11ychecker ',
                  ' casechange linkchecker autolink lists media mediaembed permanentpen powerpaste tinymcespellchecker ',
                ],
                toolbar_mode: 'floating',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Kenneth Suarez',
                toolbar:
                  'preview | undo redo | media image imagetools  | ' +
                  'bold italic backcolor | alignleft aligncenter alignright alignjustify |' +
                  'removeformat ',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>
        </div>
        <div className="w-full p-4 mx-auto text-right">
          <a
            onClick={handleCreateComment}
            className=" mx-auto mb-4  btn btn-primary  w-1/3 text-center"
          >
            Comment
          </a>
        </div>
      </div>
    </>
  );
};

export default Comments;
