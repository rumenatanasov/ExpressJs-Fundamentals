const storage = require('./storage')



storage.put('first', 'some value')
storage.put('second', 'another value')

storage.save(() => {
    storage.clear()
    storage.load(() => {
         let afterLoadValue = storage.get('second')
console.log(afterLoadValue)
    })
   
})



