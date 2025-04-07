const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const { User } = require('../models/Person');
exports.register = async (req, res) => {

    const { email, p_password, fname, lname, dob, phone } = req.body;
    // Validate the request body
    if (!email || !p_password || !fname || !lname || !dob || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email already exists in the database
    // Assuming you have a User model to interact with the database
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(p_password, 10);
        const newUser = await User.create({ email, hashedPassword, fname, lname, dob, phone });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'register', user: newUser });
}

exports.login = async (req, res) => {

    const { email, p_password } = req.body;
    // Validate the request body
    if (!email || !p_password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the email exists in the database
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //compare the password with the hashed password in the database
        // Assuming you have a User model to interact with the database
        const isMatch = await bcrypt.compare(p_password, user.p_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



exports.logout = (req, res) => {
    
    res.status(200).json({ message: 'logout' });
}

