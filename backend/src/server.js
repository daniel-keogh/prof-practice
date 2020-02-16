const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const passportMiddleware = require('./middleware/passport');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const mongoURI = require('./config/keys').mongoURI;

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
}).catch(err => {
    console.log(err);
});
