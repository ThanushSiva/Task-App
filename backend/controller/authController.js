const User = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
}

exports.home = (req, res) => {
    res.status(201).json({
        message: "success"
    })
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("cook",req.cookies);
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

        const token = createToken(user._id)

        console.log(token);

        res.status(200).json({ user, token })

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

        const token = createToken(user._id)

        res.status(200).json({ user, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}