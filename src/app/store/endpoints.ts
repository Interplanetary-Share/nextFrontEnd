const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;

const fileController = '/file';

export const apiFileUpload = apiHostname + fileController + '/upload/';
export const apiFiles = apiHostname + fileController + '/files';
