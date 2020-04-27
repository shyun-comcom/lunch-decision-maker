const express = require('express');
const path = require('path');

const app = express();

app.use("/healthz", function(req, res) {
  res.sendStatus(200);
});
app.use(express.static('dist'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(process.env.PORT || 80, 
    () => console.log(`Listening on port ${process.env.PORT || 80}!`));
