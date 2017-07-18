const url = require('url')
const fs = require('fs')
const path = require('path')
const database = require('../database/database')

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/index.html')
        )
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                res.write('404 Not Found')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}