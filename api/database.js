const mongoose  = require('mongoose')

module.exports = {
    async connect(){
        try{
            mongoose.connect(process.env.MONGODB_URL,
            { useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
                console.log('Connected to database')
            }).catch((err)=>{
                console.log(err)
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

