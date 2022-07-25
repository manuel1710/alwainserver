const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        // Connection Params are assumed to be true in Version 6 of MongoDB
        
        // const connectionParams = {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true,
        // };
        // await mongoose.connect(process.env.DB, connectionParams);
        await mongoose.connect(process.env.DB);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};