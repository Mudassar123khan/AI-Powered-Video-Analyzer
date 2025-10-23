import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import upload from 'express-fileupload';
import Ffmpeg from 'fluent-ffmpeg';
import summaryRoutes from "./routes/routes.js"

// require('dotenv').config()
// const express = require('express');

// const cors = require('cors');
// const upload = require('express-fileupload');
// const ffmpeg = require('fluent-ffmpeg');
//const summaryRoutes = require('./routes/routes');

const app = express();
app.use(cors());

app.use(express.json());
app.use(upload());

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe"); // Locally installed ffmpeg on the system

app.use("/summarize", summaryRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})


