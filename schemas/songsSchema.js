var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songsSchema = new Schema({
    uploader: String,
    songName: String,
    songCodeName: String,
    songTime: Number,
    singer: String,
    songUrl: String
});

module.exports = songsSchema;