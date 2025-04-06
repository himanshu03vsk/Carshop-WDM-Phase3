exports.register = (req, res) => {
    res.status(200).json({ message: 'register' });
}

exports.login = (req, res) => {
    res.status(200).json({ message: 'login' });
}

exports.logout = (req, res) => {
    res.status(200).json({ message: 'logout' });
}

