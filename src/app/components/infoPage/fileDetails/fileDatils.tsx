import { useGetBlobUrl } from '@/app/hooks/custom/useGetBlobUrl';
import WrapperFileType from '@/app/utils/previewFile/wrapperFileType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import RightDetailsWrapper from './module/rightDetailsWrapper';

const FileDatils = () => {
  const { cid, name, type, description } = useSelector(
    (state: any) => state.infoFile
  );

  const link = useGetBlobUrl(cid);

  const [hideDetails, setHideDetails] = useState(false);
  const iconDivider = hideDetails ? '🙈' : '🙉';

  const detailsClass = hideDetails
    ? 'w-0 h-0 opacity-0'
    : 'grid h-full w-full md:w-96 card bg-base-300 rounded-box place-items-center px-2 mx-2 pb-4 mb-4';

  const randomMessage = () => {
    const messages = [
      'Loading... Please wait patiently while we summon the magical internet dragons.',
      "Loading... It's like waiting for a sloth to cross the road.",
      "Loading... Grab a cup of coffee, sit back, and relax. We'll be ready soon.",
      "Loading... Don't worry, we're not just sitting around playing Tetris.",
      "Loading... It's taking longer than we thought. Maybe we should have fed the hamsters before they started running in their wheels.",
      "Loading... We're counting backwards from infinity. It might take a while.",
      'Loading... Our tech team is currently performing a rain dance to speed things up.',
      "Loading... It's like waiting for a snail to finish a marathon.",
      "Loading... Our hamsters have gone on a coffee break. They'll be back soon.",
      'Loading... Our code monkeys are typing as fast as they can. Please be patient.',
      "Loading... Our servers are currently playing a game of 'hide and seek'. They'll be back soon.",
      "Loading... We're almost there, just need to give the electrons a little push.",
      "Loading... It's like waiting for a turtle to finish a marathon.",
      "Loading... Our team of highly-trained squirrels is working on it. They'll be done soon.",
      'Loading... Please wait while we perform some high-tech wizardry.',
    ];
    const random = Math.floor(Math.random() * messages.length);
    return messages[random];
  };

  return (
    <>
      <div className="mt-8 "></div>
      <div className="flex flex-col md:flex-row  md:flex w-full px-2 mx-2">
        <div className="grid h-full flex-grow card bg-base-300 rounded-box place-items-center py-4">
          <h1 className="text-2xl font-bold py-4">{name}</h1>
          <p className="text-lg mb-2 py-1 text-left w-full px-4">
            {description}
          </p>
          <WrapperFileType type={type} src={link} width="100%" />

          <div className="grid grid-cols-1 w-full h-full px-2 mx-2  bg-secondary">
            <p className="text-lg py-2">{randomMessage()}</p>
            <h1 id="statusInfoFile" className="font-bold text-2xl py-4"></h1>
            <progress
              id="progressInfoFile"
              className="progress w-full mb-10"
              value={0}
              max="100"
            ></progress>
          </div>
        </div>
        <div className="divider divider-horizontal text-3xl text-center w-full md:w-16">
          <button onClick={() => setHideDetails(!hideDetails)}>
            {iconDivider}
          </button>
        </div>
        <div className={detailsClass}>
          <RightDetailsWrapper />
        </div>
      </div>
    </>
  );
};

export default FileDatils;
