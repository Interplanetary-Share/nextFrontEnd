/* eslint-disable @next/next/no-img-element */
import { randomWIPMsg } from '@/app/utils/misc/randomWIPMsg';

const WipMsg = () => {
  const randomMsg = randomWIPMsg();

  const imagesList = [
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTEwYzUxY2M2MDBkYTg1OTVmOTA0M2Y1NTQwYmUxZWY5MDkyNGYwYSZjdD1n/LUhUvH4BsfE9USnlPd/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWRhNDhiMjkyNmZhMzVlZDBhZWVjZWI2M2ExZjJmNjUzYjlkYmZmMyZjdD1n/cklPOHnHepdwBLRnQp/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmU5ZmI1MTkzNTNlNmViOTdlYTVkM2JmMjZkOWU1ODc2MmM3NzkxNiZjdD1n/l4Ep3mmmj7Bw3adWw/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmRlNzE2YThhZjViMjllOTRkYjFiNmE1NDY4MDYxYzc1YjM1ZTkwNyZjdD1n/Z9WQLSrsQKH3uBbiXq/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTRlYmU0YzEwMDE1NzBlMzlhMTRlMzcyNmUyYTRiOTA4YzUxMDQxMiZjdD1n/l3V0lsGtTMSB5YNgc/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTM2ZGQ4MDM3OWIxOWQ4YWM0MzNlZWFkYWM1NDgzZTQ2NjJjMDBjZiZjdD1n/atQF1zaSGq8s8/giphy.gif',
  ];

  return (
    <>
      <div className="mx-full mx-auto text-center">
        <img
          className="h-auto w-full h-max-96 rounded-md mx-auto pt-8"
          src={imagesList[Math.floor(Math.random() * imagesList.length)]}
          alt="404"
        />
        <p className="text-2xl">{randomMsg}</p>
      </div>
    </>
  );
};

export default WipMsg;
