import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useGetBlobUrl = (cid: string | undefined) => {
  const { urlList } = useSelector((state: any) => state.socket);
  const [url, setUrl] = useState( '/home/space.gif');


  useEffect(() => {
    if(!urlList) return;
    if(!cid) return;
    const blobUrlItem = urlList.find((url: any) => url.cid === cid) 

    if(!blobUrlItem) return;

    setUrl(blobUrlItem.url);

  }, [urlList, cid]);


    return url;
};