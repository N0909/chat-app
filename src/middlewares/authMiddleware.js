import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const auth_header = req.headers.authorization;

    if (!auth_header){
        return res.status(401).json({ message: "No token provided" });
    }

    if (!auth_header.startsWith("Bearer ")){
        return res.status(401).json({message: "No token provided"});
    }

    const token = auth_header.substring(7);
    const secret = process.env.SECRETKEY;

    try{
        const decoded = jwt.verify(token, secret);
        req.user = decoded
        next();
    }catch(err){
        res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;