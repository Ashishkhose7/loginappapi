let mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MongoUrl, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });