import Container from '@/app/components/general/containers/container';
import FileDatils from '@/app/components/infoPage/fileDetails/fileDatils';
import FileOptions from '@/app/components/infoPage/fileOptions/fileOptions';
import { setCidFile } from '@/app/store/slices/infoFile/infoFile.slice';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

const InfoPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = router.query;

  useMemo(() => {
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
