import React from 'react';
import { Document, Page } from 'react-pdf';
interface PdfProps {
  file: any; //url or blob
}

const Pdf = ({ file }: PdfProps) => {
  return (
    <Document file={file} renderMode="canvas">
      <Page pageNumber={0} />
    </Document>
  );
};

export default Pdf;
