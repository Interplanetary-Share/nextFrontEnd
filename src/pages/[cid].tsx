'use client';
import Container from '@/app/components/general/containers/container';
import { fetchInfoFileRemotely } from '@/app/store/slices/infoFile/infoFile.action';
import { setCidFile } from '@/app/store/slices/infoFile/infoFile.slice';
import { persistor } from '@/app/store/store';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import WrapperFileType from '@/app/utils/previewFile/wrapperFileType';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InfoPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = router.query;
  const {
    cid: cidStore,
    size,
    type,
    lastModified,
  } = useSelector((state: any) => state.infoFile);

  useEffect(() => {
    if (!cid || cid === '') return;

    dispatch(setCidFile(cid));
    dispatch(fetchInfoFileRemotely() as any);
  }, [cid]);

  return (
    <Container>
      <div>{cid}</div>
      <div>asdasfsdafsdadfasdf</div>
      <div>{size}</div>
      <div>asdasfsdafsdadfasdf</div>
      <div>{type}</div>
      <div>asdasfsdafsdadfasdf</div>
      <div>{lastModified}</div>
      {type && cid && (
        <WrapperFileType type={type} src={getIpfsGateway(cid as string)} />
      )}
    </Container>
  );
};

export default InfoPage;
