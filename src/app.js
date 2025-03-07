const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(cookieParser())

const userRoute = require('./routes/user.routes')
const postRoute = require('./routes/post.routes')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/user", userRoute);
app.use('/post', postRoute);



module.exports = app;