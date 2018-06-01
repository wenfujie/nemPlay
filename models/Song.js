var mongoose = require('mongoose');
var songsSchema = require('../schemas/songsSchema');

var Song = mongoose.model("ch_song",songsSchema);
module.exports = Song;