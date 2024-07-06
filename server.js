const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const loginRoute = require('./routes/login-route');

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    // origin: process.env.ALLOWED_ORIGIN
}));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}
mongoose.connect(process.env.MONGODB, {
}).then(() => {
    console.log("Connected to MongoDB");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send("Welcome to Floral Fiesta");
});

app.use('/auth', loginRoute);