let database = require('./database.config')
let instanodeDb = require('./instanode-db')

const MIN_DATE = new Date(-86400000000000000)
const MAX_DATE = new Date(86400000000000000)

let minDate = ''
let maxDate = ''

database().then(() => {
 instanodeDb.filter('2017-06-03T17:14:55.585Z').then((images) => {
        images.forEach(i => console.log(i))
    })


})