const userRouter = require("./route/users");
const channelRouter = require("./route/channels");

const express = require("express");
const app = express();

app.listen(3000);

app.use("/", userRouter);
app.use("/channels", channelRouter);
