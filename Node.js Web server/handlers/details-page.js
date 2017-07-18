const fs = require('fs')
const url = require('url')
const database = require('../database/database')
const path = require('path')

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.pathname.startsWith('/images/details/') && req.method === 'GET'){
        let id = Number(req.pathname.split('/').pop())

        let filePath = path.normalize(path.join(__dirname, '../views/details.html'));
        fs.readFile(filePath, (err, data) => {
            if(err) {
                console.log(err)
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                res.write('404 Not Found!')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            let image = database.images.getById(id)
            let content = ''
            content += `<div>
            <h2>${image.name}</h2>
            <img src="${image.url}">
            </div>`;

             let html = data.toString().replace('{content}', content).replace('{img.id}', image.id)

            res.write(html)
            res.end()
        })
    } else {
        return true
    }
}