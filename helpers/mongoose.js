const mongoose = require('mongoose')

let mongoURI;
if(process.env.NODE_ENV === 'develpoment') mongoURI = process.env.MONGO_URI_DEV
else mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

.then(() => console.log('connect to database'))
.catch(() => console.log('cant connect to database'));

module.exports = mongoose