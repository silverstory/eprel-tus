const tus = require('tus-node-server');
const path = require('path');
const fs = require('fs');

const server = new tus.Server();
server.datastore = new tus.FileStore({
  path: '/files'
});
const host = '127.0.0.1';
const port = 8001;
server.get('/uploads', (req, res) => {
    const files_path = path.join(process.cwd(), server.datastore.path);
    fs.readdir(files_path, (err, filenames) => {
        const files = filenames.map((filename) => {
            return {
                name: filename,
                url: `http://${host}:${port}/${filename}`,
            };
        });
        res.writeHead(200);
        res.write(JSON.stringify({ files }));
        res.end();
    });
});
server.listen({ host, port }, () => {
  console.log(`[${new Date().toLocaleTimeString()}] tus files listening at http://${host}:${port}`);
});