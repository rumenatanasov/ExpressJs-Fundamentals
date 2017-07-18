db.collection('cars').update({}, {$set: {createdOn: Date.now()} }, {multi: true})
db.collection('cars').update({}, { $set: {isRented: false} }, {multi: true})
db.collection('rents').update({}, { $set: {rentedOn: Date.now()} }, {multi: true})
