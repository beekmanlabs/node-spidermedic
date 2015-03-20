var SimpleCrawler = require('simplecrawler');
var Clog = require('./clog');

module.exports = function (url, path, port, interval) {
    var clog = new Clog();
    clog.info('Validating %s', url);
    var crawler = SimpleCrawler.crawl(url);
    crawler.path = path;
    crawler.port = port;
    crawler.interval = interval;
    crawler
        .on('fetchcomplete', function (queueItem, responseBuffer, response) {
            clog.success('%s (%d bytes) %s', response.statusCode, responseBuffer.length, queueItem.url);
        })
        .on('fetch404', function (queueItem, response) {
            clog.warning('%s %s', response.statusCode, queueItem.url);
        })
        .on('fetcherror', function (queueItem, response) {
            clog.error('%s %s', response.statusCode, queueItem.url);
        })
        .on('complete', function () {
            clog.info('All queued items have been processed');
        });
};
