const mongoose   = require("mongoose");
const URI = "mongodb://localhost:27017/db_avilatek"

main().then(() => console.log("db is connect", URI)).catch(err => console.log(err));

async function main() {
    await mongoose.connect(URI);    
}