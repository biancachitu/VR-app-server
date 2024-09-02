const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function registerUser (email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashedPassword });
};

async function loginUser (email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid email or password');
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser
};
