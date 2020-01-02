const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// load schemas
const User = require("./models/User");

// Routes
app.use('/api/v1/abc', require('./routes/index'));

// app.use(express.static(path.join(__dirname, 'client/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

// app.get('*', (req, res) => {
//     res.render('notfound');
// });

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error in running server");
        return;
    }
    console.log(`Server is up and running on http://localhost:${process.env.PORT}`);
});
