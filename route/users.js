require("dotenv").config();
const express = require("express");
const connection = require("../mariadb");
const { body } = require("express-validator");
const validate = require("../validator/validate");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use(express.json());

router.post("/login", (req, res) => {
  [
    body("email").notEmpty().isEmail().withMessage("Valid email is required"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("Valid email is required"),
    validate,
  ];
  const { email, password } = req.body;

  connection.query(
    `SELECT * FROM users WHERE email="${email}"`,
    (err, result) => {
      if (err !== null) {
        console.log(`query error: ${err}`);
        return;
      }
      if (result === undefined) {
        res.status(400).json({
          message: `일치하는 아이디와 비밀번호가 없습니다.`,
        });
      }

      const { storedPassword, name } = result[0];

      if (password !== storedPassword) {
        res.status(400).json({
          message: `일치하는 아이디와 비밀번호가 없습니다.`,
        });
        return;
      }

      const loginToken = jwt.sign(
        {
          email: email,
          name: name,
        },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "30m",
          issuer: "zz",
        }
      );

      res
        .status(200)
        .cookie("token", loginToken, {
          httpOnly: true,
        })
        .json({
          message: `${name}님 로그인 되었습니다.`,
        });
    }
  );
});

router.post(
  "/join",
  [
    body("email").notEmpty().isEmail().withMessage("Valid email is required"),
    body("name").notEmpty().isString().withMessage("Valid name is required"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("Valid password is required"),
    body("contact")
      .notEmpty()
      .isString()
      .withMessage("Valid contact is required"),
    validate,
  ],
  (req, res) => {
    const { email, name, password, contact } = req.body;

    connection.query(
      `INSERT INTO users (email, name, password, contact) VALUES ("${email}", "${name}", "${password}", "${contact}")`,
      (err, result) => {
        if (err !== null) {
          console.log(`query error: ${err}`);
          return;
        }

        // res.status(400).json({
        //   message: `중복된 ID입니다.`,
        // });

        res.status(201).json({
          message: `${name}님 가입을 환영합니다.`,
        });
      }
    );
  }
);

router
  .route("/users")
  .get(
    [
      body("email").notEmpty().isEmail().withMessage("Valid email is required"),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;
      connection.query(
        `SELECT * FROM users WHERE email="${email}"`,
        (err, results) => {
          if (results === undefined || results.length === 0) {
            res.status(404).json({
              message: "회원 정보가 없습니다.",
            });
            return;
          }
          res.status(200).json(results[0]);
        }
      );
    }
  )
  .delete(
    [
      body("email").notEmpty().isEmail().withMessage("Valid email is required"),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;

      connection.query(
        `DELETE FROM users WHERE email="${email}"`,
        (err, result) => {
          if (err !== null) {
            console.log(`query error: ${err}`);
            return;
          }

          res.status(200).json({
            message: `${email}님 이용해주셔서 감사합니다.`,
          });
        }
      );
    }
  );

module.exports = router;
