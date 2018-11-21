const tus = require('tus-node-server');
const express = require('express');
const path = require('path');
const fs = require('fs');
const server = new tus.Server();

// const fileNameFromUrl = (req) => {
//   return req.url.replace(/\//g, '-');
// }

server.datastore = new tus.FileStore({
    directory: '/files', // this is in drive C:\files folder
    path: '/',
    // namingFunction: fileNameFromUrl
});

// const metadataStringToObject = (stringValue) => {
//   const keyValuePairList = stringValue.split(',')

//   return keyValuePairList.reduce((metadata, keyValuePair) => {
//     let [key, base64Value] = keyValuePair.split(' ')
//     metadata[key] = new Buffer(base64Value, "base64").toString("ascii")

//     return metadata
//   }, {})
// }

const storageFolder = '/files'

// server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
//   const oldPath = `${storageFolder}/${event.file.id}`
//   const newPath = `${storageFolder}/${metadataStringToObject(event.file.upload_metadata).filename}`
//   console.log(oldPath);
//   console.log(newPath);
//   fs.rename(oldPath, newPath, (err) => {
//     // handle error in here
//     console.error(err)
//   })
// })

server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
  const oldPath = `${storageFolder}/${event.file.id}`
  const newPath = `${storageFolder}/${event.file.id}.pdf`
  console.log(oldPath);
  console.log(newPath);
  fs.rename(oldPath, newPath, (err) => {
    // handle error in here
    console.error(err)
  })
})



// server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
//     console.log(`Upload complete for file ${event.file.id}`);

//     // let params = {
//     //     Bucket: keys.awsBucketName,
//     //     Body: fs.createReadStream(path.join("/files", event.file.id)),
//     //     Key: `${event.file.id}/rawfile`
//     // };
//     // s3.upload(params, function(err, data) {
//     //     console.log(err, data);
//     //     fs.unlink(path.join("/files", event.file.id), (err) => {
//     //         if (err) throw err;
//     //         console.log('successfully deleted file');
//     //     });
//     // });

// });

const app = express();
const uploadApp = express();
uploadApp.all('*', server.handle.bind(server));
app.use('/', uploadApp);
app.listen(1080);

// const tus = require('tus-node-server');
// const path = require('path');

// const server = new tus.Server();
// server.datastore = new tus.FileStore({
//     path: '/files'
// });

// // directory: 'files/videos/user-uploads',
// // path: '/api/videos/tus-upload'

// // server.get('/files/*', (req, res) => {
// //   // Send the file
// //   filename = path.basename(req.url);
// //   console.log(filename);
// //   res.sendFile(path.join(__dirname, './files', filename));
// // });
// // server.get('/uploads', (req, res) => {
// //   // Read from your DataStore
// //   fs.readdir(server.datastore.path, (err, files) => {
// //     // Format the JSON response and send it
// //     res.sendFile(path.join(__dirname, './files', files.));
// //   });
// // });
// const host = '127.0.0.1';
// const port = 1080;
// server.listen({ host, port }, () => {
//     console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
// });