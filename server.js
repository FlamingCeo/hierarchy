require("dotenv").config();
const http = require("http");
const express = require("express");
const connectDB = require("./db/connect");
const employeeRoute = require("./routes/employees");
const app = express();
const authRouter = require("./routes/auth");

const port = process.env.PORT || 8000;

app.use(express.json());

const server = http.createServer(app);
app.use("/api/auth", authRouter);
app.use("/api/hierarchy", employeeRoute);

const start = async () => {

    try {
        await connectDB().authenticate();
        server.listen(port, () => {
            console.log(`Server is listening port ${port}...`);

        })
    } catch (error) {
    console.log(error);
  }
};

start();
