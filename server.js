var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

var fs = require('fs');

app.get('/write-csv', async (req, res) => {
  const { size } = req.query;
  const fileName = "product_10L.csv";
  const fileWriteStream = fs.createWriteStream(fileName);
  for (let i = 1; i <= size; i++) {
    const ableToWrite = fileWriteStream.write(`Product_${i},SKU${i}\n`);
    if (!ableToWrite) {
      await new Promise(resolve => fileWriteStream.once('drain', resolve));
    }
  }
  res.send({ success: true, message: 'File generated successfully.' });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});