const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost:27017/test-post", {useNewUrlParser: true})
    .then(() => console.log("database connected to the server"))
    .catch((error) => console.log(error))


module.exports = mongoose;