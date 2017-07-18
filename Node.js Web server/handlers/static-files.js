const fs = require('fs')
const path = require('path')
const url = require('url')

function getContentType(url) {
   let contentType = ''
    if (url.endsWith('.css')) {
        contentType = 'text/css'
    } else if (url.endsWith('.js')) {
        contentType = 'application/javascript'
    } else if (url.endsWith('.g3')) {
        contentType = 'image/g3fax'
    } else if (url.endsWith('.html')) {
        contentType = 'text/html'
    } else if(url.endsWith('.png')) {
        contentType = 'image/png'
    } else if(url.endsWith('.ico')) {
        contentType = 'image/x-icon'
    } else {
        contentType = 'text/plain'
    }
    return contentType
}

let validateFileExtension = (path) => {
    if(path.endsWith('.html') || path.endsWith('.css') || path.endsWith('.js') || path.endsWith('jpg')) {
        return true
    }
    return false
}
module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
        fs.readFile('.' + req.pathname, (err, data) => {
            if (err || req.method !== 'GET' || !req.pathname.startsWith('/content/') || !validateFileExtension(req.pathname)) {
                res.writeHead(404)
                res.write('Resource not found!')
                res.end()
                return 
            }
            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            })
            res.write(data)
            res.end()
        })
 }
 

