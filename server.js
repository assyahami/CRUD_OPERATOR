const app = require("./app");
const { connectDB } = require("./config/db");
let port = app.get("port")


connectDB()

const server=app.listen(port, () => {
    console.log('App running on port ' + port);
})


