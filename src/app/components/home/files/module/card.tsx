/* eslint-disable @next/next/no-img-element */
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import CardOptionsUpper from './cardOptionsUpper';
import CardStats from './cardStats';

interface CardProps {
  name: string;
  description: string;
  cid: string;
  cover?: string;
  link?: string;
  date?: string;
  size?: string;
  type?: string;
  likes?: [string];
  dislikes?: [string];
  reports?: [string];
  favorites?: [string];
}

const Card = ({
  name,
  description,
  cover,
  cid,
  link,
  date,
  size,
  type,
  likes,
  dislikes,
  reports,
  favorites,
}: CardProps) => {
  const image = cover ? getIpfsGateway(cover) : '/home/space.gif';

  return (
    <div className="card card-compact bg-secondary shadow-xl">
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
        }}
        className="h-72 px-4"
      >
        <CardOptionsUpper />
      </div>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <CardStats
          cid={cid}
          likes={likes}
          dislikes={dislikes}
          favorites={favorites}
        />
        <div className="card-actions justify-center gap-4">
          <Link href={'/' + cid}>
            <button className="btn btn-primary">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
