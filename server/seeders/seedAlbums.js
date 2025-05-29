require('dotenv').config();
const { faker } = require('@faker-js/faker');
const albumSchema = require('../models/album').albumSchema;
const mongoose = require('mongoose');

async function seedAlbums(){
    const uri = await process.env.MONGO_URI;
    try {
        let albums = []
        for (i=0; i < 15; i++){
            let oneAlbum = {
                title: await faker.music.album(),
                artist: await faker.music.artist(),
                genre: await faker.music.genre(),
                comments:[{body: "", date: new Date()}],
                songs: [],
                cover_img: await faker.image.urlPicsumPhotos(),
                votes: {
                    up: Math.round(Math.random() * 100 + 1),
                    down: Math.round(Math.random() * 100 + 1)
                }
            }

            let numberOfSongs = Math.ceil( Math.random() * 15 );
            for (j=0; j <= numberOfSongs; j++){
                let songName = await faker.music.songName();
                oneAlbum.songs.push(songName)
            }

            albums.push(oneAlbum);
            console.log("album pushed")
        }
        
        const connection = await mongoose.connect("mongodb://localhost:27017/Music")

        const Album = await connection.model("Album", albumSchema)
        await Album.insertMany(albums)
        

    } catch (error) {
        console.error('There was a problem creating seeds: ', error)
    } finally {
        console.log("Seeding Complete");
    }

}

seedAlbums();

module.exports = seedAlbums;
