import React from 'react';

export const bytes2MB = (bytes = 0) => {
  return (bytes / 1024 / 1024).toFixed(2);
};

export const byteNormalize = (bytes = 0) => {
  if (bytes === 0) return '0 Byte';
  const k = 1024;
  const dm = 2 < 0 ? 0 : 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
