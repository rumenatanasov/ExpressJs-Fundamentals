const fs = require('fs')
const database = require('../database/database')
const path = require('path')
const url = require('url')
module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.pathname.indexOf('/views/status') !== -1 && req.method === 'GET') {
        req.headers['statusheader'] = 'Full'
    }
    let statusHeader = req.headers['statusheader']
    if ( statusHeader === 'Full') {
        let filepath = path.normalize(
            path.join(__dirname, '../views/status.html')
        )
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                return 
            }
            let totalImages = database.images.getAll().length

            data = data.replace('{{content}}', `<h1>Total images - ${totalImages}</h1>`)
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