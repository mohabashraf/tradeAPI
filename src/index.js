const express = require('express');
const userRouter = require('./controller/user');
const userService = require('./service/user')
const app = express();


userService.populateUser();
app.use(express.json());
app.use('/', userRouter);
app.listen(3000);

module.exports = app;
