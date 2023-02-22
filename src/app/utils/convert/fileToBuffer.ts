const fileToBuffer = async (file: any) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(Buffer.from(reader.result as any));
    };
    reader.onerror = reject;
  });
};

export default fileToBuffer;
