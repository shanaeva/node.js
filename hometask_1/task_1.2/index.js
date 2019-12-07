import fs from 'fs';
import csv from 'csvtojson';
import {pipeline} from 'stream';

const csvFilePath = './csv/data.csv';
const txtFilePath = './csv/data.txt';

pipeline (
    fs.createReadStream(csvFilePath),
    csv({
        noheader: false,
        headers: ['book', 'author', 'amount', 'price'],
        includeColumns: /book|author|price/,
        colParser: {"price" : "number"}
    })
    .on('error', (err) => console.assert(err)),
    fs.createWriteStream(txtFilePath),
    (err) => err && console.assert(err),
)
