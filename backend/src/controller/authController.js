const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator'); // Importando o validator

// Função para capitalizar a primeira letra de uma string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validações
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(409).send('Erro. Email já cadastrado.');
        if (!validator.isEmail(email)) return res.status(400).send('Erro. Email inválido.');
        if (name.length <= 2) return res.status(400).send('Erro. Nome deve ter mais de 2 caracteres.');

        // Validações da senha
        if (password !== confirmPassword) return res.status(400).send('Erro. Senhas não coincidem.');
        if (!/[0-9]/.test(password)) return res.status(400).send('Erro. A senha deve conter pelo menos um número.');
        if (!/[a-z]/.test(password)) return res.status(400).send('Erro. A senha deve conter pelo menos uma letra minúscula.');
        if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?~`]/.test(password)) return res.status(400).send('Erro. A senha deve conter pelo menos um caractere especial.');
        if (password.length < 5) return res.status(400).send('Erro. A senha deve conter pelo menos 5 caracteres.');

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Primeira letra maiúscula e o resto minúscula
        const capitalizedName = capitalizeFirstLetter(name);

        // Criar o usuário no banco de dados
        await User.create({ name: capitalizedName, email, password: hashedPassword });
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error(error); // Log do erro para debug
        res.status(500).send('Erro interno no servidor.');
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) return res.status(404).send('Erro. Usuário não encontrado.');

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) return res.status(401).send('Erro. Senha incorreta.');

        res.status(200).send('Usuário logado com sucesso!');
    } catch (error) {
        console.error(error); // Log do erro para debug
        res.status(500).send('Erro interno no servidor.');
    }
};

const getUser = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            res.json({
                name: user.name
            });
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error); // Log do erro para debug
        res.status(500).send('Erro ao buscar usuário.');
    }
};

module.exports = {
    registerUser,
    getUser,
    userLogin
};
