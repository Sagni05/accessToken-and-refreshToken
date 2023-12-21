require("dotenv").config()

const {
    DB_NAME,
    DB_PASSWORD,
    DB_USER_NAME,
    PORT,
    ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY
} = process.env

if (!DB_NAME ||
    !DB_PASSWORD ||
    !DB_USER_NAME ||
    !PORT ||
    !ACCESS_SECRET_KEY ||
    !REFRESH_SECRET_KEY) {
    throw new Error("ENV variable not found")
}

module.exports = envConfigs = {
    dbName: DB_NAME,
    dbPass: DB_PASSWORD,
    dbUser: DB_USER_NAME,
    port: PORT,
    accessSecretKey: ACCESS_SECRET_KEY,
    refreshSecretKey: REFRESH_SECRET_KEY
}