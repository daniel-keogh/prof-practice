const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;

const PORT = 4000;
const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT || PORT, () => console.log(`Server listening on port ${PORT}...`));
}).catch(err => {
    console.log(err);
});
