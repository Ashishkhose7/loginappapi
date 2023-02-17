let dotenv = require('dotenv');
dotenv.config({ path: '.env' })
let mongoose = require('mongoose');
mongoose.connect(process.env.MongoUrl).then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });
