'use strict';

const http = require('node:http');
const fs = require('node:fs');

const routeHandler = require('./src/handler.js');
const index = fs.readFileSync('./index.html', 'utf8');
const resolveHostIP = require('./src/utils/ip.js');

let port = 3000;
if (Number(process.env.PORT) > 0) {
  port = Number(process.env.PORT);
} else {
  console.log(`[WARN]: No port specified, using default port ${port}`);
}

const server = http.createServer(async (req, res) => {
  req.on('error', (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end();
  });

  const { url, method, headers } = req;
  const [path, queryString = ''] = url.split('?');
  const query = Object.fromEntries(
    queryString.split('&')
      .filter(q => !!q)
      .map(q => q.split('='))
  );

  if (path === '/' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(index);
    res.end();
    return;
  }

  if (path === '/action_request' && method === 'POST') {
    const responseCode = await routeHandler({ path, method, headers, query });

    res.statusCode = responseCode;
    res.setHeader('Content-Type', 'text/html');
    res.end();
    return;
  }
}).listen(port, () => {
  const host = resolveHostIP();
  const msg = host ? `[INFO]: Listening on http://${host}:${port}` : `[INFO]: Listening on port ${port}`
  console.log(msg);
});

server.on('error', (err) => {
  console.error(`[ERROR]: ${err}`);
  process.exit(1);
});
