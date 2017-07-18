const fs = require('fs')
const query = require('querystring')
const database = require('../database/database')
const url = require('url')

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.pathname !== '/images/upload') {
        return true
    }

    if (req.method === 'GET') {
        fs.readFile('./views/image-upload-form.html', (err, data) => {
            if (err) {
                console.log(err)
                return 
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data)
            res.end()
        })
    } else if (req.method === 'POST') {
        let result = ''
        req.on('data', (data) => {
            result += data
        })
        req.on('end', () => {
            let imageData = query.parse(result)

            let imageName = imageData.name
            let imageUrl = imageData.url

            if (!imageName || !imageUrl) {
                fs.readFile('./views/image-upload-error.html', (err, data) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.write(data)
                    res.end()
                    
                })
            } else {
                database.images.add(imageData)

            res.writeHead(302, {
                'Location': '/'
            })
            res.end()
            }         
        })
    }
}
