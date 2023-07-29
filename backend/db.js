const mongoose=require('mongoose');
const mongoURi='mongodb://localhost:27017/'

const connectToMongo=()=>{
    mongoose.connect(mongoURi,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to Mongoose Successfully")
     
}

module.exports = connectToMongo;  