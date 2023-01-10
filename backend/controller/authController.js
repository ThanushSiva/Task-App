const User = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const createToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET, { expiresIn: '1d' });
}

exports.home = (req, res) => {
    res.status(201).json({
        message: "success"
    })
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw Error('All fields are needed')
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw Error('User not exist')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error('Incorrect password')
        }

        const token = createToken(user.email)

        res.cookie("token", token, { expire: "1d", httpOnly: true, sameSite: 'none' });

        res.status(200).json({  message: "success" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw Error('All fields are needed')
        }

        const exists = await User.findOne({ email })

        if (exists) {
            throw Error('Email alreay in use')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({ email, password: hash })

        const token = createToken(user.email)

        res.cookie("token", token, { expire: "1d", httpOnly: true, sameSite: 'none' });

        res.status(200).json({  message: "success" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.logoutUser = async (req, res) => {
    return res.clearCookie("token").status(200).json({ message: "successfully logged out" })
}