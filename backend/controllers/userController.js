const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'User Name,email, and Password are Required' })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Registered' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            name,
            email,
            password: hashPassword,
            role
        })

        res.status(201).json({ message: 'User Registered Successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error during Registration' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'User email and Password Required' })

        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid User email or Password' })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid User email or Password' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        user.save();

        res.status(200).json({
            message: 'User Login Successful',
            accessToken,
            refreshToken,
            role: user.role
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error during Login' })
    }
}