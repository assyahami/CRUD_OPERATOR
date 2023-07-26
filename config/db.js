const mongoose = require("mongoose")
const db = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD)

const connectDB = async () => {
    try {
        mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }).then(() => console.log('________Connect DB________'))
            .catch((err) => console.log(err, 'DB CONNECTION FAILLED..!!'))
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    connectDB
}