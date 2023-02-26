/* eslint-disable @next/next/no-img-element */
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import Link from 'next/link';
import CardOptionsUpper from './cardOptionsUpper';
import CardStats from './cardStats';

interface CardProps {
  name: string;
  description: string;
  cid: string;
  cover?: string;
}

const Card = ({ name, description, cover, cid }: CardProps) => {
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
        <CardStats />
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
