import { setFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Hero = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const windowObj = window as any;
    if (!windowObj.ipfsServer) return toast.error('IPFS server not found');

    dispatch(
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        nativeFile: {
          file: file,
        },
      })
    );

    document.getElementById('opnUploadFileModal')?.click();
  };

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
              type="file"
              className="file-input w-full max-w-xs my-6"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
