/* eslint-disable @next/next/no-img-element */
import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import { format } from 'date-fns';
import { Key } from 'react';
import { useSelector } from 'react-redux';

interface Field {
  key: string;
  value: string;
}

const InfoTable = () => {
  const {
    cid,
    size,
    type,
    lastModified,
    name,
    description,
    tags,
    cover,
    date,
  } = useSelector((state: any) => state.infoFile);

  const fields: Array<Field> = [
    size && {
      key: 'Size',
      value: byteNormalize(size),
    },

    type && {
      key: 'Type',
      value: type,
    },

    lastModified && {
      key: 'Last Modified',
      value: lastModified,
    },

    date && {
      key: 'Upload Date',
      value: format(new Date(date), 'dd/MM/yyyy'),
    },
  ];

  return (
    <div className="w-full flex">
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        {cover && (
          <div className="avatar w-full">
            <div className="w-64 rounded mx-auto">
              <img src={getIpfsGateway(cover)} alt="cover" />
            </div>
          </div>
        )}

        <dl className="grid grid-cols-1 gap-x-4 gap-y-8">
          {fields.map((field, idx) => (
            <div key={idx} className="sm:col-span-1 p-3 m-3">
              <dt className="text-sm font-medium text-gray-500">{field.key}</dt>
              <dd className="mt-1 text-sm text-gray-900">{field.value}</dd>
            </div>
          ))}

          <div className="sm:col-span-2">
            {tags.map((tag: string, idx: Key | null | undefined) => (
              <span
                key={idx}
                className="badge badge-outline px-2 mx-2 my-1 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default InfoTable;
