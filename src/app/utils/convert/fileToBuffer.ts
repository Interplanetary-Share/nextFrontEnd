const fileToBuffer = async (file: any) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      console.log('fastlog => reader.result', reader.result);

      const buffer = Buffer.from(reader.result as any);
      console.log('fastlog => buffer', buffer);

      resolve(Buffer.from(reader.result as any));
    };
    reader.onerror = reject;
  });
};

export default fileToBuffer;
