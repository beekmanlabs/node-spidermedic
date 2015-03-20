var chalk = require('chalk');

function Clog() {
}

Clog.prototype.log = function (level, msg, args) {
    if (args === undefined) {
        args = [msg];
    }
    args[0] = this.formatters()[level](msg);
    console.log.apply(console, args);
};

Clog.prototype.formatters = function () {
    return {
        info: chalk.blue,
        success: chalk.green,
        error: chalk.red,
        warning: chalk.yellow
    };
};

Clog.prototype.info = function (msg) {
    this.log('info', msg, arguments);
};

Clog.prototype.success = function (msg) {
    this.log('success', msg, arguments);
};

Clog.prototype.error = function (msg) {
    this.log('error', msg, arguments);
};

Clog.prototype.warning = function (msg) {
    this.log('warning', msg, arguments);
};

module.exports = Clog;
