require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const albumRouter = require('./routes/albumRouter.js');

app.use(cors());
app.use(express.json());
app.use('/albums', albumRouter)


app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
    console.log()
});
