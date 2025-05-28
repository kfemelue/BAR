const mongoose = require('mongoose');
const {Schema, model} = mongoose;

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


const AlbumModel= mongoose.Model("Album", albumSchema)

export default AlbumModel;
