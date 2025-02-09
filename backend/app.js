const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('./routes/fileUpload');

const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use('/upload', fileUpload);

mongoose.connect('mongodb://127.0.0.1:27017/creditApp', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
