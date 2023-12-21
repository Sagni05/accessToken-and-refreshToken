const { Sequelize } = require("sequelize")
const { dbName, dbPass, dbUser } = require("./config")

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPass,
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    }
)


try {
    sequelize.authenticate()
    console.log("Connection has been establised successfully");

} catch (e) {
    console.error("Unable to connect Database", e);
}

module.exports = sequelize