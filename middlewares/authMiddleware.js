const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization; 

    if (authHeader && authHeader.startsWith("Bearer")) { 
        token = authHeader.split(" ")[1]; 
    }

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token is not valid" });
    }
};



module.exports = verifyToken;