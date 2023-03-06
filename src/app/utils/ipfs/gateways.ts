import { defaultGateway } from "@/app/store/endpoints";

export const getIpfsGateway = (cid: string) => {
//  const gateways = [
//    'https://ipfs.io/ipfs/', //OK
//    'https://gateway.ipfs.io/ipfs/', //OK
//    'https://cloudflare-ipfs.com/ipfs/',
//    'https://cf-ipfs.com/ipfs/',
//    'https://gateway.pinata.cloud/ipfs/',
//    'https://dweb.link/ipfs/',
//  ];

const gateways = [
  defaultGateway
]

  const randomGateway = gateways[Math.floor(Math.random() * gateways.length)];
  return randomGateway + cid;
};
