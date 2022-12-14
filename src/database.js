const mongoose   = require("mongoose");
const URI = "mongodb://localhost:27017/db_backend-login"

const db = require("./models");
const Role = db.role;


main()
    .then(() => {
        console.log("db is connect", URI)
        initial();
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(URI);    
}


function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }