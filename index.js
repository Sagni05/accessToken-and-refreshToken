const express = require("express")
const { port } = require("./config/config")
const { json, urlencoded } = require("body-parser")
const userRouter = require("./route/route")

const app = express()

app.use(json())

app.use(urlencoded({ extended: true }))

app.use("/auth", userRouter)

app.use((err, req, res, next) => {
    if (err) {
        const statusCode = err.statusCode || 500
        const message = err.message || "Interval server error"

        return res.status(statusCode).send({
            statusCode,
            message
        })
    }
    next()
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})

