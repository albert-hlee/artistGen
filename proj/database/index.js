const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoURL: {
    type: String,
    unique: true
  },
  description: String,
  watchers: Number,
  forked: Number,
})