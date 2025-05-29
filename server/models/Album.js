const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
    title: String,
    artist: String,
    genre: String,
    comments:[{ body: String, date: Date }],
    songs: [String],
    cover_img: String,
    votes: { 
        upvotes: Number, 
        downvotes: Number
    }
});

// const Album = mongoose.Model("Album", albumSchema)

module.exports.albumSchema = albumSchema;
