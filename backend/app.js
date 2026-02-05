const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/userRoute');
const dotenv = require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB_URL).then((con) => {
    console.log(`Db Connected Successfully ` + con.connection.host);
}).catch((err) => console.log(`Db not Connected`));

app.use('/api/auth', route);

app.listen(process.env.PORT, () => {
    console.log(`app listening on the port ${process.env.PORT}`);
})

