interface IFileToBlob {
  file: File;
  callback: (blob: any) => void;
}

const fileToBlob = ({ file, callback }: IFileToBlob) => {
  const reader = new FileReader();
  if (!reader) return;
  reader.readAsDataURL(file);

  reader.onload = () => {
    if (!reader.result) return;
    const blob = reader.result;
    callback(blob);
  };
};

export default fileToBlob;
