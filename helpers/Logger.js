let config = {
    appenders: {
        logConsola: { type: 'console' },
        logWarn: { type: 'file', filename: 'warn.log' },
        logErr: { type: 'file', filename: 'error.log' },
    },
    categories: {
        default: { appenders: ["logConsola"], level: "info" },
        consolaInfo: { appenders: ['logConsola'], level: 'info' },
        consolaWarn: { appenders: ['logConsola'], level: 'warn' },
        consolaErr: { appenders: ['logConsola'], level: 'error' },
        fileWarn: { appenders: ['logWarn'], level: 'warn' },
        fileErr: { appenders: ['logErr'], level: 'error' }
    }
}


module.exports = config;