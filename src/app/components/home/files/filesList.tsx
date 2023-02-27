/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@/app/components/general/containers/container';
import Grid from '@/app/components/general/containers/grid';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Card from './module/card';

const FilesList = () => {
  const { basicList } = useSelector((state: any) => state.allFiles);

  return (
    <Grid>
      {basicList.map((file: any) => {
        const {
          cid,
          name,
          type,
          size,
          _id,
          description,
          date,
          cover,
          tags,
          likes,
          dislikes,
          reports,
          favorites,
          link,
        } = file;

        return (
          <Card
            key={_id}
            cid={cid}
            name={name}
            description={description}
            likes={likes}
            dislikes={dislikes}
            reports={reports}
            favorites={favorites}
            link={link}
            cover={cover}
            date={date}
            size={size}
            type={type}
          />
        );
      })}
    </Grid>
  );
};

export default FilesList;
