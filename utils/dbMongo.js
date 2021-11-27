const mongoose = require("mongoose");


//const DATABASE_URL = "mongodb+srv://user_project:12345@projectthebridge.exjra.mongodb.net/test";
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to dbMongo established"));

module.exports = mongoose;