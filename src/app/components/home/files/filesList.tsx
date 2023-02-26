/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@/app/components/general/containers/container';
import Grid from '@/app/components/general/containers/grid';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Card from './module/card';

const FilesList = () => {
  const { basicList } = useSelector((state: any) => state.allFiles);
  //   <div key={file._id} className="bg-secondary rounded-md">
  //   <div>{file.cid}</div>
  //   <div>{file.name}</div>
  //   <div>{file.size}</div>
  //   <div>{file.type}</div>
  //   <div>{file.lastModified}</div>
  //   <Link href={'/' + file.cid}>Link</Link>
  // </div>
  return (
    <Grid>
      {basicList.map((file: any) => {
        const { cid, name, type, size, _id, description, date, cover, tags } =
          file;

        return (
          <Card key={_id} cid={cid} name={name} description={description} />
        );
      })}
    </Grid>
  );
};

export default FilesList;
