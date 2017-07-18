const path = require('path')
let rootpath = path.normalize(path.normalize(__dirname, '/../../'))

module.exports = {
    development: {
        rootPath: rootpath,
        db: 'mongodb://localhost:27017/Forum-Prep',
        port: 2017
    },
    production: {
        port: process.env.PORT
    }
}
