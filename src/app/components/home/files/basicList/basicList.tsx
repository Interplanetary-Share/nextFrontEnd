/* eslint-disable react-hooks/exhaustive-deps */
import { fetchFilesFromDb } from '@/app/store/slices/files/allFiles.action';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
