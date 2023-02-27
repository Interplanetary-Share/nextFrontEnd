const hexstringToBlob = (hexString: string, type?: string) => {
  const newBuffer = Buffer.from(hexString, 'hex');
  const newUint8Array = new Uint8Array(newBuffer);

  const newBlob = type
    ? new Blob([newUint8Array], { type: type })
    : new Blob([newUint8Array]);
  const href = URL.createObjectURL(newBlob);
  return href;
};

export default hexstringToBlob;
