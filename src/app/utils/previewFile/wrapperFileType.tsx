/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface WrapperFileTypeProps {
  type: string;
  src: string;
  width?: number | string;
}

const WrapperFileType = ({ type, src, width = 300 }: WrapperFileTypeProps) => {
  if (type.includes('image')) {
    return (
      <img
        src={src}
        alt="image"
        style={{
          width: width,
          maxHeight: 'hscreen',
        }}
      />
    );
  }

  if (type.includes('video')) {
    return (
      <video
        src={src}
        controls
        style={{
          width: width,
          maxHeight: 'hscreen',
        }}
      />
    );
  }

  if (type.includes('audio')) {
    return (
      <audio
        src={src}
        controls
        style={{
          width: width,
          maxHeight: 'hscreen',
        }}
      />
    );
  }

  if (type.includes('text')) {
    return <div>Text</div>;
  }

  if (type.includes('application')) {
    return <div>Application</div>;
  }

  return <div>Other</div>;
};

export default WrapperFileType;
