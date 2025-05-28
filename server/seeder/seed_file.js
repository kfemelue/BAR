const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const UserModel = require('../models/Album');
require('dotenv').config();

async function seedMusic(){
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.COLLECTION);

        let albums = []

        for (i=0; i < 15; i++){
            let oneAlbum = {
                title: await faker.music.album(),
                artist: await faker.music.artist(),
                genre: await faker.music.genre(),
                comments:[{body: `${this.title} is a great album by ${this.artist}!`, date: new Date()}],
                songs: [],
                cover_img: await faker.image.urlPicsumPhotos(),
                votes: {
                    up: Math.Round(Math.random() * 100 + 1),
                    down: Math.Round(Math.random() * 100 + 1)
                }
            }

            let numberOfSongs = Math.ceil( Math.random() * 15 );
            
            for (j=0; j<= numberOfSongs; j++){
                let songName = await faker.music.songName();
                oneAlbum.songs.push(songName)
            }
            albums.push(oneAlbum);
        }
        await collection.insertMany(albums)
    } catch (error) {
        console.error('There was a problem creating seeds: ', error)
    }
    client.close()
}

seedMusic()

module.exports = seedMusic;
