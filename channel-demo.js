const express = require("express");
const { ChannelInfo } = require("./types/types");

const app = express();

app.listen(3000);
app.use(express.json());

const channels = new Map();

app
  .route("/channels")
  .post((req, res) => {
    const channelInfo = req.body;

    if (
      Object.keys(channelInfo).length !==
        Object.keys(new ChannelInfo()).length &&
      channelInfo.userId === undefined &&
      channelInfo.id === undefined &&
      channelInfo.title === undefined
    ) {
      res.status(400).json({
        message: "잘못된 채널 생성 양식입니다.",
      });
      return;
    }

    if (channels.has(channelInfo.id)) {
      res.status(400).json({
        message: "채널 ID가 중복되었습니다.",
      });
      return;
    }

    const channel = channels.set(channelInfo.id, new ChannelInfo(channelInfo));

    res.status(201).json({
      message: `${channel.userId}님 ${channel.title}채널 개설을 축하합니다.`,
    });
  })
  .get((req, res) => {
    if (channels.size === 0) {
      res.status(404).json({
        message: "등록된 채널 정보가 없습니다.",
      });
      return;
    }

    res.status(200).json([...channels.values()]);
  });

app
  .route("/channels/:id")
  .put((req, res) => {
    const id = req.params.id;
    const channel = channels.get(id);

    if (channel === undefined) {
      res.status(404).json({
        message: "등록된 채널 정보가 없습니다.",
      });
      return;
    }

    if (req.body.title === undefined) {
      res.status(401).json({
        message: "입력 양식이 잘못되었습니다.",
      });
      return;
    }

    const previousTitle = channel.title;
    channel.title = req.body.title;
    channels.set(id, channel);

    res.status(200).json({
      message: `채널명이 성공적으로 수정되었습니다. ${previousTitle} -> ${channel.title}`,
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const channel = channels.get(id);

    if (channel === undefined) {
      res.status(404).json({
        message: "등록된 채널 정보가 없습니다.",
      });
      return;
    }

    channels.delete(id);

    res.status(200).json({
      message: `${channel.title} 채널이 삭제 되었습니다.`,
    });
  })
  .get((req, res) => {
    const id = req.params.id;
    const channel = channels.get(id);

    if (channel === undefined) {
      res.status(404).json({
        message: "등록된 채널 정보가 없습니다.",
      });
      return;
    }

    res.status(200).json(channel);
  });
