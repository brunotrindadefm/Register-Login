const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api',routes)

const sequelize = require('./db/dbConfig');

sequelize.sync().then(() => {
    app.listen(7000, () => {
        console.log("Listening on port 7000");
    });
    console.log('Conectado ao banco de dados');
}).catch((error) => {
    console.log(error.message);
    console.log('Erro ao conectar no banco de dados');
})

