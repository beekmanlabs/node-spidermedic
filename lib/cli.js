#!/usr/bin/env node

var argv = require('yargs').argv;
var spiderMedic = require('./spider-medic');
var Clog = require('./clog');

var clog = new Clog();
var params = {
    url: argv.url,
    path: argv.path || '/',
    port: argv.port || 80,
    interval: argv.interval || 300
};

if (params.url === undefined) {
    clog.error('A url must be specified, like --url=http://example.com');
    process.exit(1);
}

spiderMedic(params.url, params.path, params.port, params.interval);
