const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        // find user
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            res.render('auth/login', {
                message: 'Usuário não encontrado!',
            })

            return
        }

        // compare password
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            res.render('auth/login', {
                message: 'Senha inválida!',
            })

            return
        }

        // auth user
        req.session.userid = user.id

        console.log('Login realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // passwords match validation
        if (password != confirmpassword) {
            console.log('As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        // email validation
        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            console.log('O e-mail já está em uso!')
            res.render('auth/register')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        try {
            const createdUser = await User.create(user)
            console.log('Cadastro Realizado')
            req.session.userid = createdUser.id;
            req.session.save(() => {
                res.redirect('/');
            })
        } catch (error) {

        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}