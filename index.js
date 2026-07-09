const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const upload = multer();

const MY_TOKEN = "8865686723:AAEqEmFR1Uw_C77kGR_8w";
const MY_CHAT_ID = "6576769234";

app.post('/upload', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("No file uploaded");

        const form = new FormData();
        form.append('chat_id', MY_CHAT_ID);
        form.append('document', req.file.buffer, { filename: req.file.originalname });

        await axios.post(`https://api.telegram.org/bot${MY_TOKEN}/sendDocument`, form, {
            headers: form.getHeaders()
        });

        res.status(200).send("Done");
    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).send("Error");
    }
});

app.listen(3000, () => {
    console.log("Server is running and listening on port 3000");
});
