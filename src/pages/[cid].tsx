'use client';
import Container from '@/app/components/general/containers/container';
import FileDatils from '@/app/components/infoPage/fileDetails/fileDatils';
import FileOptions from '@/app/components/infoPage/fileOptions/fileOptions';
import { setCidFile } from '@/app/store/slices/infoFile/infoFile.slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
  }, [cid]);

  return (
    <Container>
      <FileDatils />
      <FileOptions />
    </Container>
  );
};

export default InfoPage;
