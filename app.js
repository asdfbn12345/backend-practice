require("dotenv").config();
const userRouter = require("./route/users");
const channelRouter = require("./route/channels");

const express = require("express");
const app = express();

app.listen(process.env.PORT);

app.use("/", userRouter);
app.use("/channels", channelRouter);
