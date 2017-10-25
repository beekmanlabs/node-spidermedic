var figures = require('figures');
var SimpleCrawler = require('simplecrawler');
var Clog = require('./clog');

module.exports = function (url, path, port, interval) {
    var hasFailed = false;
    var clog = new Clog();
    clog.info('Validating %s', url);
    var crawler = SimpleCrawler.crawl(url);
    crawler.path = path;
    crawler.port = port;
    crawler.interval = interval;
    crawler
        .on('fetchcomplete', function (queueItem, responseBuffer, response) {
            clog.success('%s %s (%d bytes) %s', figures.tick, response.statusCode, responseBuffer.length, queueItem.url);
        })
        .on('fetch404', function (queueItem, response) {
            hasFailed = true;
            clog.error('%s %s %s', figures.cross, response.statusCode, queueItem.url);
        })
        .on('fetcherror', function (queueItem, response) {
            hasFailed = true;
            clog.error('%s %s %s', figures.cross, response.statusCode, queueItem.url);
        })
        .on('complete', function () {
            clog.info('All queued items have been processed');
        });
    return hasFailed;
};
