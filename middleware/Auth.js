import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(400).send('Token not provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            role_id: decoded.role_id,
            user_id: decoded.id
        };

        next();
    }
    catch(err){
        res.status(401).send('Unauthorized!');
    }
}

export { verifyToken };