export const bufferToOctetStream = (buffer: any) => {
  const octetStream = new Uint8Array(buffer);
  console.log(`fastlog => octetStream:`, octetStream);
  return octetStream;
};
