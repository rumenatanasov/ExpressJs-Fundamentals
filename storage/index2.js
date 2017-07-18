const storage = require('./promise')



storage.put('first', 'chok')
storage.put('second', 'bok')

storage.save()
        .then(() => {
            storage.clear()

            storage.load().then(() => {
                let afterLoadValue = storage.get('second')
                console.log(afterLoadValue)
            })
        })




