import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;


    console.log(authHeader)
    // Check if the Authorization header is present and starts with 'Bearer '
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",err)
                return res.status(403).json({ message: "Token is not valid" });
            }
            req.user = decoded; // Attach the decoded user information
            console.log(req.user)
            next(); // Call the next middleware or route handler
        });
    } else {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }
};

export default verifyJWT;
