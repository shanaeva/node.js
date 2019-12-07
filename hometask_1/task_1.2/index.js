import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = './csv/data.csv';
const txtFilePath = './csv/data.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream.pipe(csv({
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
    includeColumns: /book|author|price/,
    colParser: {"price" : "number"}
})
    .on('error', (err) => console.assert(err)))

    .pipe(writeStream);