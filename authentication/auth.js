const { verify } = require("jsonwebtoken")
const { accessSecretKey } = require("../config/config")


const authentication = (req, res, next) => {
    try {

        let token = req.headers.authorization || req.headers.Authorization


        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: "Token is expired or invalid"
            })
        }

        let validToken = token.split(" ")[1]

        verify(validToken, accessSecretKey, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "User Not authorized"
                })
            }
            req.user = decode

            next()
        })


    } catch (e) {
        next(e)
    }
}


module.exports = authentication