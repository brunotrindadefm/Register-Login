const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.get('/', (req, res) => {
   res.send('Hello, world!') 
});

app.listen(7000, () => {
    console.log("Listening on port 7000")
});