const jwt = require("jsonwebtoken")

exports.authorization = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ error: "no authorization" })
    }
    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.email = data.email;
        return next()
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
}