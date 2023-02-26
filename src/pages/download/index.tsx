import axios from 'axios';
import React, { useMemo } from 'react';

const Download = () => {
  //   const file = useMemo(() => {
  //     //     axios
  //     //       .get(
  //     //         'http://localhost:3005/file/download/Qme39zraSvvUd98wzXu65dJbtwjB9YrHsdZG5ADnqPmwnw'
  //     //       )
  //     //       .then((res) => {
  //     //         console.log(`fastlog => res:`, res);
  //     //         // const url = window.URL.createObjectURL(new Blob([res.data]));
  //     //         // const link = document.createElement('a');
  //     //       })
  //     //       .catch((err) => {
  //     //         console.log(err);
  //     //       });

  //     const file1 =
  //       'http://localhost:3005/file/download/Qme39zraSvvUd98wzXu65dJbtwjB9YrHsdZG5ADnqPmwnw';
  //     const file2 =
  //       'http://localhost:3005/file/download/QmZevsNJqKXYUUotZqtBcHH2eqxjbWaNgqz15RQzqPH2i6';

  //     // get buffer from file in batch mode
  //     axios
  //       .get(file1, {
  //         responseType: 'arraybuffer',
  //       })
  //       .then((res) => {
  //         const buffer = Buffer.from(res.data);
  //         console.log(`fastlog => buffer:`, buffer);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  return (
    <div>
      <div>Download</div>
    </div>
  );
};

export default Download;
