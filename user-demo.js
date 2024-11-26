const express = require("express");
const { UserInfo } = require("./types/types");

const app = express();

app.listen(3000);
app.use(express.json());

const users = new Map();

app.post("/login", (req, res) => {
  const userInfo = req.body;

  if (
    Object.keys(userInfo).length !== Object.keys(new UserInfo()).length &&
    !userInfo.id &&
    !userInfo.password
  ) {
    res.status(400).json({
      message: `잘못된 유저 정보입니다.`,
    });
    return;
  }

  const user = users.get(parseInt(id));
  if (user === undefined && user.password !== password) {
    res.status(400).json({
      message: `아이디 또는 비밀번호가 유효하지 않습니다.`,
    });
    return;
  }

  res.status(200).json({
    message: `${user.name}님 환영합니다.`,
  });
});

app.post("/join", (req, res) => {
  const { id, password, name } = req.body;

  if (id && password && name) {
    res.status(400).json({
      message: `유효하지 않은 유저 정보입니다.`,
    });
    return;
  }

  if (users.has(id)) {
    res.status(400).json({
      message: `중복된 ID입니다.`,
    });
    return;
  }

  users.set(id, new UserInfo(id, password, name));
  res.status(201).json({
    message: `${name}님 환영합니다.`,
  });
});

app
  .route("/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id);

    const user = users.get(id);
    if (user === undefined) {
      res.status(404).json({
        message: `유효하지 않은 ID입니다.`,
      });
      return;
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
    });
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);

    const user = users.get(id);
    if (user === undefined) {
      res.status(404).json({
        message: `유효하지 않은 ID입니다.`,
      });
      return;
    }

    users.delete(id);
    res.status(200).json({
      message: `${user.name}님 이용해주셔서 감사합니다.`,
    });
  });
