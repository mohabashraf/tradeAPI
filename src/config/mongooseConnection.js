const mongoose = require('mongoose');

const mongoDbConnection = 'mongodb://127.0.0.1:27018/test' || process.env.mongo_db_url
mongoose.connect(mongoDbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
