var log4js = require('log4js');
const logPut = './logs';
//log4js
log4js.configure({
    appenders:{
        consol:{type: 'stdout'},
        fileInfo:{type:'file', filename: logPut+'/log4jsInfo.log'},
        fileDebug:{type:'file', filename: logPut+'/log4jsDebug.log'}
    },
    categories:{
        debug: {appenders: ['consol', 'fileDebug'], level: 'debug'},
        default: {appenders: ['consol', 'fileInfo'], level: 'info'}
    }
})

const logger = log4js.getLogger('debug');
module.exports = logger;