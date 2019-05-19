'use strict';
/*
 * Install:すでにgulpで同じコマンドを打っている場合は不要
 *   $ npm i -D
 * Usage:
 *   $ node http_server.js
 * */
const express = require('express');
const path = require('path');
const os = require('os');
const opn = require('opn');

const nwifs = os.networkInterfaces();
let ip = '';
Object.keys(nwifs).forEach( nwifName => {
  nwifs[nwifName].forEach(nwif => {
    if ('IPv4' === nwif.family && nwif.internal === false) ip = nwif.address;
  });
});
const server = express();
const port = 8081;

server.use(express.static(path.join(__dirname)));

server.listen(port, () => {
  console.log(`Running on http:\/\/${ip || 'localhost'}:${port}`);
  opn(`http:\/\/${ip || 'localhost'}:${port}\/index.html`);
});
