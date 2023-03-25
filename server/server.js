'use strict';

const http = require('node:http');
const fs = require('node:fs');
const ws = require('ws');

const routeHandler = require('./src/handler.js');
const connections = require('./src/connections.js');

const index = fs.readFileSync('./index.html', 'utf8');

let port = 3000;
if (Number(process.env.PORT) > 0) {
  port = Number(process.env.PORT);
} else {
  console.log(`[Warning]: No port specified, using default port ${port}`);
}

let host = 'localhost';
if (process.env.HOST) {
  host = process.env.HOST;
} else {
  console.log(`[Warning]: No hostname specified, using default hostname ${host}`);
}

const server = http.createServer((req, res) => {
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

  const { statusCode, headers: responseHeaders, body } = routeHandler({ path, method, headers, query });

  res.statusCode = statusCode;

  Object.entries(responseHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  res.write(body);
  
  res.end();
}).listen(port, host, () => {
  console.log(`[Info]: Listening on port ${port}`);
});

server.on('error', (err) => {
  console.error(`[Error] ${err}`);
  process.exit(1);
});

const websocket = new ws.Server({ server });

websocket.on('connection', (socket) => {
  socket.on('error', (err) => {
    console.error(`[Error] ${err}`);

    socket.close();

    connections.delete(socket);
  });

  connections.add(socket);
});