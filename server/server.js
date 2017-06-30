const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.enc.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
app.listen(port,()=>{
      console.log('server started on port'+port);
    });

    module.exports = {app};
