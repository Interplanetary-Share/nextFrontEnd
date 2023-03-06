interface IIpfsStatusInfoFile {
  message?: string;
  progress?: number;
}

export const setStatusInfoFile = ({
  message,
  progress,
}: IIpfsStatusInfoFile) => {
  const statusInfoFile = document.getElementById('statusInfoFile') as any;
  const progressInfoFile = document.getElementById('progressInfoFile') as any;
  if (statusInfoFile && message) {
    statusInfoFile.innerText = message;
    statusInfoFile.value = message;
    statusInfoFile.innerHTML = message;
    statusInfoFile.textContent = message;
    //   'Initializing local node IPFS';
  }
  if (progressInfoFile && progress) {
    progressInfoFile.value = progress;
    progressInfoFile.innerHTML = progress;
    progressInfoFile.innerText = progress;
    progressInfoFile.textContent = progress;
    //   10;
  }
};
