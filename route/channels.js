const express = require("express");
const connection = require("../mariadb");
const { body, validationResult } = require("express-validator");
const { validate } = require("../validator/validate");

const router = express.Router();

router.use(express.json());

router
  .route("/")
  .post(
    [
      body("title")
        .notEmpty()
        .isString()
        .withMessage("Valid title is required"),
      body("userId").notEmpty().isInt().withMessage("Valid userId is required"),
      validate,
    ],
    (req, res) => {
      const { title, userId } = req.body;

      connection.query(
        `INSERT INTO channels (title, user_id) (?, ?)`,
        [title, userId],
        (err, result) => {
          if (err !== null) {
            console.log(err);
          }

          // if (err) {
          //   res.status(400).json({
          //     message: "채널 ID가 중복되었습니다.",
          //   });
          //   return;
          // }

          res.status(201).json({
            message: `${userId}님 ${title}채널 개설을 축하합니다.`,
          });
        }
      );
    }
  )
  .get(
    [
      body("userId")
        .notEmpty()
        .isString()
        .withMessage("Valid userId is required"),
      validate,
    ],
    (req, res) => {
      const { userId } = req.body;

      connection.query(
        `SELECT * FROM channels WHERE user_id=?`,
        [userId],
        (err, result) => {
          if (err !== null || result === undefined) {
            err !== null ? console.log(err) : false;
            res.status(404).json({
              message: "등록된 채널 정보가 없습니다.",
            });
            return;
          }

          res.status(200).json(result[0]);
        }
      );
    }
  )
  .put(
    [
      body("previousTitle")
        .notEmpty()
        .isString()
        .withMessage("Valid previousTitle is required"),
      body("nextTitle")
        .notEmpty()
        .isString()
        .withMessage("Valid nextTitle is required"),
      validate,
    ],
    (req, res) => {
      const { previousTitle, nextTitle } = req.body;

      connection.query(
        `UPDATE channels SET title=? WHERE title=?`,
        [nextTitle, previousTitle],
        (err, result) => {
          if (err !== null) {
            console.log(err);
            res.status(400);
            return;
          }

          if (result.affectedRows !== 0) {
            res.status(400).json({
              message: "수정할 내용이 없습니다.",
            });
            return;
          }

          res.status(200).json({
            message: `채널명이 성공적으로 수정되었습니다. ${previousTitle} -> ${nextTitle}`,
          });
        }
      );
    }
  )
  .delete(
    [
      body("title")
        .notEmpty()
        .isString()
        .withMessage("Valid title is required"),
      validate,
    ],
    (req, res) => {
      const { title } = req.body;

      connection.query(
        `DELETE FROM channels WHERE title=?`,
        [title],
        (err, result) => {
          if (err !== null) {
            console.log(err);
            res.status(400);
            return;
          }

          res.status(200).json({
            message: `${title} 채널이 삭제 되었습니다.`,
          });
        }
      );
    }
  );

module.exports = router;
