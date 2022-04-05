import { getAccessToken } from '../utils/cookies'

const jwt = require('jsonwebtoken') // Authentication & Authorization
const key = 'phiphuoc'



export const JWTAuthToken = (data) => {
    return (jwt.sign(
        { ...data },
        key,
        { expiresIn: '300s' }
    ))
}


export const JWTVerify = (token) => {
    try {
        var decoded = jwt.verify(token, key);
        return {
            status: 200,
            decoded
        }
    } catch (err) {
        return {
            status: 401,
            err
        }
    }
}


export const AuthMiddleware = (refresh) => {
    return async (req, res) => {
        try {
            const authorizationHeader = req.headers.authorization;
            //const token = authorizationHeader?.split(" ")[1];
            var token;
            var name = '_jwt' + "=";
            var ca = req.headers.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) token = c.substring(name.length, c.length);
            }
            console.log(token)

            jwt.verify(token, key, (err, data) => {
                if (err) {
                    res.status(200).send(JSON.stringify({
                        success: false,
                        status: 401,
                        refresh: 'Token hết hạn sử dụng'
                    }))
                }
                if (data) {
                    return refresh(req, res, data)
                }
            })
        } catch (err) {
            return res.status(400).send(JSON.stringify({
                success: false,
                message: 'Refresh thất bại'
            }))
        }
    }

}