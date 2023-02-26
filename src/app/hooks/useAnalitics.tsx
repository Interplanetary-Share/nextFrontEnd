import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const useAnalitics = () => {
  const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID as string;

  useEffect(() => {
    TagManager.initialize({ gtmId: measurementId });
  }, []);
};

export default useAnalitics;
