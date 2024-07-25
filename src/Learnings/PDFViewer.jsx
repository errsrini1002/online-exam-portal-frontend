import React from 'react';

const PDFViewer = ({ file }) => {
  return (
    <iframe
      src={file}
      title="PDF Viewer"
      width="100%"
      height="600px"
      style={{ border: 'none' }}
    />
  );
};

export default PDFViewer;
