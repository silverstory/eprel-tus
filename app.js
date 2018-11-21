// // https://www.npmjs.com/package/serve
// const handler = require('serve-handler');
// const http = require('http');

// const server = http.createServer( async (request, response) => {
//   // You pass two more arguments for config and middleware
//   // More details here: https://github.com/zeit/serve-handler#options
//   return await handler(request, response, {
//     // "redirects": [
//     //   { "source": "/uploads/**", "destination": "/uploads/files" }
//     // ],
//     // directory listing options disable or allow a path
//     "directoryListing": false
//     // "directoryListing": [
//     //   "!/files",
//     //   "/files/**",
//     //   "!/"
//     // ]
//   });
// })

// const host = '127.0.0.1';
// const port = 8000;
// server.listen(port, host, () => {
//   console.log(`[${new Date().toLocaleTimeString()}] files service listening at http://${host}:${port}`);
// });



const express = require('express');
const path = require('path');

const app = express();


const root = '/'; // this is equivalent to drive C:\

// then you access your file using http://tus-server-ip:1090/files/file-hash.
app.use('/files',express.static(path.join(root, 'files'),{index:false}));

const host = '127.0.0.1';
const port = 1090;
app.listen(port, host, () => {
  console.log(`[${new Date().toLocaleTimeString()}] file server listening at http://${host}:${port}`);
});