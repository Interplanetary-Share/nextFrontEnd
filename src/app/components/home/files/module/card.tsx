/* eslint-disable @next/next/no-img-element */
import { useGetBlobUrl } from '@/app/hooks/custom/useGetBlobUrl';
import Link from 'next/link';
import { useRef } from 'react';
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
  type: string;
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
  const image = useGetBlobUrl(cover); //ESTO TRAE LA IMAGEN DE IPFS
  const buttonRef = useRef(null);
  return (
    <div className="card card-compact bg-secondary shadow-xl">
      <CardOptionsUpper
        cid={cid}
        name={name}
        type={type}
        // link={link}
      />
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
        }}
        className="h-72 px-4 cursor-pointer"
        onClick={() => {
          if (buttonRef.current) {
            const button = buttonRef.current as any;
            button.click();
          }
        }}
      ></div>
      <div className="card-body">
        <h2 className="card-title overflow-hidden">{name}</h2>
        <p>{description}</p>
        <CardStats
          cid={cid}
          likes={likes}
          dislikes={dislikes}
          favorites={favorites}
        />
        <div className="card-actions justify-center gap-4">
          <Link href={'/' + cid} ref={buttonRef}>
            <button className="btn btn-primary">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
