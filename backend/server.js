const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

const { credentialRouter } = require('./routes/credentialRoute');
const { awsRouter } = require('./routes/awsRoute');
const { myclassRouter } = require('./routes/myclassRoute');
const { xlsxRouter } = require('./routes/xlsxRoute');

const server = async () => {
  try {
    const MONGO_URI = 'mongodb://localhost:27017/hybrix';
    await mongoose.connect(MONGO_URI);
    // mongoose.set('debug', true);
    console.log('mongodb is connected');

    app.use(express.json({limit: 5000000})); // body-parser
    
    app.use(cors());

    // setting routers
    app.use('/credential', credentialRouter);
    app.use('/aws', awsRouter);
    app.use('/myclass', myclassRouter);
    app.use('/xlsx', xlsxRouter);

    const port = 8888;
    app.listen(port, () => console.log(`server is running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

server();
