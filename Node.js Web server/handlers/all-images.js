const fs = require('fs')
const path = require('path')
const url = require('url')
const database = require('../database/database')

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if(req.pathname === '/images/all' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/all.html')
        )
        fs.readFile(filePath, (err, data) => {
            if(err) {
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
           let image = database.images.getAll()
            let result = ''
            result += '<ul>'

            for(let i = 0; i < image.length; i++) {
                let imagee = image[i]
                result += `
                    <div class="image-card">
                     <h1><a href="/images/details/${i + 1}">${imagee.name}</a></h1>
                    <img class="image-img" src="${imagee.url}" />
                    </div>
                `
            }
            result += '</ul>'

            // data = data.replace('{{content}}', result)
            let html = data.toString().replace('{content}', result)
            res.write(html)
            res.end()
        })
    } else {
        return true
    }
}