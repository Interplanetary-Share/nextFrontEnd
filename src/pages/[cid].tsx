/* eslint-disable @next/next/no-img-element */
import Container from '@/app/components/general/containers/container';
import FileDatils from '@/app/components/infoPage/fileDetails/fileDatils';
import FileOptions from '@/app/components/infoPage/fileOptions/fileOptions';
import { setCidFile } from '@/app/store/slices/infoFile/infoFile.slice';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InfoPage = () => {
  const { found } = useSelector((state: any) => state.infoFile);
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = router.query;

  useMemo(() => {
    if (!cid || cid === '') return;
    dispatch(setCidFile(cid));
  }, [cid]);

  return (
    <Container>
      {found ? (
        <>
          <FileDatils />
          <FileOptions />
        </>
      ) : (
        <div className="w-full mx-auto pt-8">
          <img
            className="h-96 rounded-md mx-auto pt-8"
            src="https://media4.giphy.com/media/mPytjcsG3XS4o/giphy.gif?cid=ecf05e47yi7kpab2e0pjl4u5946u8rda6bx4p09c4rlhjyke&rid=giphy.gif&ct=g"
            alt="404"
          />
        </div>
      )}
    </Container>
  );
};

export default InfoPage;
