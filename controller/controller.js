
const sequelize = require("../config/dbConnection")
const { hash, compare } = require("bcrypt")
const { sign, verify } = require("jsonwebtoken");
const { accessSecretKey, refreshSecretKey } = require("../config/config");

const register = async (req, res, next) => {
    try {

        const { name, email, password, confirmPassword } = req.body;

        const selectQuery = `SELECT * FROM user WHERE email ='${email}'`

        const [result] = await sequelize.query(selectQuery)

        if (result.length > 0) {
            return res.status(409).json({
                statusCode: 409,
                message: "User already exist with that email"
            })
        }

        const accessToken = sign({ name, email }, accessSecretKey, {
            expiresIn: "1m"
        })

        const refreshToken = sign({ name, email }, refreshSecretKey)

        const hashPassword = await hash(password, 10)

        const insertQuery = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}')`

        await sequelize.query(insertQuery)

        res.status(201).json({
            statusCode: 201,
            message: "User register successfully",
            accessToken,
            refreshToken
        })

    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {

        const { account, password } = req.body

        const chechQuery = `SELECT * FROM user WHERE email = '${account}'`

        const [result] = await sequelize.query(chechQuery)

        if (result.length === 0) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not exist"
            })
        }

        const user = result[0]

        const { name, email } = user

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid password or email"
            })
        }

        const accessToken = sign({ name, email }, accessSecretKey, {
            expiresIn: "1m"
        })

        const refreshToken = sign({ name, email }, refreshSecretKey)


        res.status(201).json({
            statusCode: 201,
            message: "User Logged In successfully",
            accessToken,
            refreshToken
        })

    } catch (e) {
        next(e)
    }
}

const fetchUser = async (req, res, next) => {
    try {
        const fetchUser = `SELECT * FROM USER`

        const [result] = await sequelize.query(fetchUser)

        res.status(200).json({
            statusCode: 200,
            message: "User Fetched successfully",
            result
        })

    } catch (e) {
        next(e)
    }
}

const refreshToken = async (req, res, next) => {
    try {

        const { oldRefreshToken } = req.body

        if (!oldRefreshToken) {
            return res.status(401).json({
                statusCode: 401,
                message: "Please provide old refresh token"
            })
        }

        let userOldData = verify(oldRefreshToken, refreshSecretKey);

        if (!userOldData) {
            return res.status(401).json({
                statusCode: 401,
                message: "invalid token"
            })
        }
        const { name, email } = userOldData

        const accessToken = sign(
            { name, email }, refreshSecretKey, {
            expiresIn: "1m"
        }
        )

        res.json({ accessToken })

    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    login,
    fetchUser,
    refreshToken
}