const fs = require('fs')
const dataFile = 'storage.dat'

let data = {}
let validateKeyAsString = (key) => {
      if (typeof (key) !== 'string') {
        throw new Error('Key must be string')
    }
}
let isExist = (key) => {
    if(!data.hasOwnProperty(key)) {
        throw new Error('Key could not be found!')
    }
}
let put = (key, value) => {
    validateKeyAsString(key)
    if(data.hasOwnProperty(key)) {
        throw new Error('Key already exists!')
    }
    data[key] = value
    console.log(data)
}
let get = (key) => {
    validateKeyAsString(key)
    if(!data.hasOwnProperty(key)) {
        throw new Error('Key could not be found!')
    }
    return data[key]
}
let update = (key, value) => {
    validateKeyAsString(key)
    isExist(key)

    data[key] = value

}
let deleteItem = (key) => {
    validateKeyAsString(key)
    isExist(key)
    
    //data[key] = undefined
     delete data[key]
}
let clear = () => {
    data = {}
}
let save = (callback) => {
    let dataAsString = JSON.stringify(data)
    fs.writeFile(dataFile, dataAsString, (err) => {
        if (err) {
            console.log(err)
            return
        }
        data = JSON.parse(dataAsString)
        callback()
    })
    fs.writeFileSync(dataFile, dataAsString)
}
let load = (callback) => {
    fs.readFile(dataFile, 'utf-8', (err, dataJson) => {
        if (err) {
            console.log(err)
            return 
        }
       data = JSON.parse(dataJson)
          callback()
    })
}
module.exports = {
    put: put,
    get: get,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
}