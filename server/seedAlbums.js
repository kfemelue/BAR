const { faker } = require('@faker-js/faker');
const albumSchema = require('./models/Album').albumSchema;
const mongoose = require('mongoose');
require('dotenv').config();

async function seedAlbums(){
    const uri = process.env.URL;
    const database = process.env.DB;
    const connection_string = `${uri}/${database}`;

    console.log(process.env.DB)
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
        }
        
        console.log(connection_string)
        const connection = await mongoose.connect(connection_string)

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
