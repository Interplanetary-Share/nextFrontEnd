/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useSelector } from 'react-redux';

const BasicList = () => {
  const { basicList } = useSelector((state: any) => state.allFiles);

  return (
    <div>
      {basicList.map((file: any) => (
        <div key={file._id}>
          <div>{file.cid}</div>
          <div>{file.name}</div>
          <div>{file.size}</div>
          <div>{file.type}</div>
          <div>{file.lastModified}</div>
          <Link href={'/' + file.cid}>Link</Link>
        </div>
      ))}
    </div>
  );
};

export default BasicList;
