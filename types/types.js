class UserInfo {
  id;
  password;
  name;

  constructor(userInfo) {
    this.id = userInfo?.id;
    this.password = userInfo?.password;
    this.name = userInfo?.name;
  }
}

class ChannelInfo {
  userId;
  id;
  title;

  constructor(channelInfo) {
    this.userId = channelInfo?.userId;
    this.id = channelInfo?.id;
    this.title = channelInfo?.title;
  }
}

exports.UserInfo = UserInfo;
exports.ChannelInfo = ChannelInfo;
