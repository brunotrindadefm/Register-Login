const express = require('express');
const routes = express.Router();
require('dotenv').config();

const { Sequelize } = require('sequelize');

const { Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.sync().then(() => console.log('Conectado no db')).catch(() => console.log('Erro ao conectar no db'));

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

const validator = require('validator');
const bcrypt = require('bcrypt');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

routes.post('/register', async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validações
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(409).send('Erro. Email ou senha indisponíveis');
        if (!validator.isEmail(email)) return res.status(400).send('Erro. Email inválido.');
        if (name.length <= 2) return res.status(400).send('Erro. Nome deverá ter mais de 2 letras');
        // Valdações da senha
        if (password !== confirmPassword) return res.status(400).send('Erro. Senhas não coinscidem.');
        if (!/[0-9]/.test(password)) return res.status(400).send('Erro. A senha deve conter pelo menos um número.');
        if (!/[a-z]/.test(password)) return res.status(400).send('Erro. A senha deve conter pelo menos uma letra minúscula.');
        if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?~`]/.test(password)) return res.status(400).send('Erro. A senha deve conter pelo menos um caractere especial.');
        if (password.length < 5) return res.status(400).send('Erro. A senha deve conter pelo menos 5 letras.');

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Primeira letra maiúscula e o resto minúscula
        const capitalizedName = capitalizeFirstLetter(name);

        await User.create({ name: capitalizedName, email, password: hashedPassword });
        res.status(201).send('Usuário cadastrado com sucesso!')
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro interno no servidor.')
    }

});

routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) return res.status(404).send('Erro. Usuário não encontrado');

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) return res.status(404).send('Erro. Usuário não encontrado')

        res.status(201).send('Usuário logado com sucesso!')

    } catch (error) {
        res.status(500).send('Erro interno no servidor.')
    }
});

routes.get('/register/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            res.json({
                name: user.name
            });
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao buscar usuário');
        console.error(error);
    }
});

routes.get('/register', async (req, res) => {

    const users = await User.findAll();
    if (users.length === 0) return res.status(404).send('Nenhum usuário cadastrado')
    res.json(users)

});

module.exports = routes;