/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface WrapperFileTypeProps {
  type: string;
  src: string;
}

const WrapperFileType = ({ type, src }: WrapperFileTypeProps) => {
  if (type.includes('image')) {
    return <img src={src} alt="image" />;
  }

  if (type.includes('video')) {
    return <video src={src} controls />;
  }

  if (type.includes('audio')) {
    return <audio src={src} controls />;
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
