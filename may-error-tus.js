const fs = require('fs')
const path = require('path')
const tus = require('tus-node-server')

const server = new tus.Server()

const storageFolder = path.join(process.cwd(), '/files')

server.datastore = new tus.FileStore({
    path: `/${storageFolder}`
})

const metadataStringToObject = (stringValue) => {
  const keyValuePairList = stringValue.split(',')

  return keyValuePairList.reduce((metadata, keyValuePair) => {
    let [key, base64Value] = keyValuePair.split(' ')
    metadata[key] = new Buffer(base64Value, "base64").toString("ascii")

    return metadata
  }, {})
}

server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
  const oldPath = `${storageFolder}/${event.file.id}`
  const newPath = `${storageFolder}/${metadataStringToObject(event.file.upload_metadata).filename}`
  console.log(oldPath);
  console.log(newPath);
  // fs.rename(oldPath, newPath, (err) => {
  //   // handle error in here
  //   console.error(err)
  // })
})

const host = '0.0.0.0'
const port = 1080
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`)
})