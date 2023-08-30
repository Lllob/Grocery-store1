const { Schema, model } = require('mongoose');

const blacklistSchema = new Schema({
    accessToken: { type: String, required: true, ref: 'User' },
  }
);

const BlackList = model('blacklist', blacklistSchema);
BlackList.createIndexes();
module.exports = BlackList;