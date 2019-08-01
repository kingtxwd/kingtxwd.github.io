//const dictionary = ['hello','world','restaurant'];
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let pickedWord = '';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true });



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/words', (req, res) => {
    let dictionary = [];
    client.connect(function(err) {
        var db = client.db('hangman');
        var collection = db.collection('words');
        collection.find().toArray((err, items) => {
            
            items.forEach(item => {
                if (item != null) {
                    dictionary.push(item.spell);
                }
            });
            let word = dictionary[Math.floor(Math.random()*dictionary.length)];
            pickedWord = word;
            res.send(word);
        })
    }); 
});

app.post('/guess', function(req, res) {
    let character = req.body.character;
    const array = pickedWord.split('');
    res.send(array.map(char => character == char));
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));

