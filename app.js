let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config({ path: '.env' })
let port = process.env.PORT || 7500
let db = require('./db');
let cors = require('cors');

app.use(cors());

let authcontroller = require('./controller/auth');

app.use('/api/auth', authcontroller);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
