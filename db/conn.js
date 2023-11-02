const mongoose = require('mongoose');
 mongoose.set('strictQuery', true);

async function connectDb() {
    try {
        await mongoose.connect(process.env.databaseurl, {
            useNewUrlParser: true
        });
        console.log("Database connected successfully!")
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDb;