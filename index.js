const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const upload = multer();

const MY_TOKEN = "8865686723:AAEqEmFR1Uw_C77kGR_8w"; // تأكد من هذا التوكين
const MY_CHAT_ID = "6576769234";

app.post('/upload', upload.single('document'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send("No file uploaded");

        const form = new FormData();
        form.append('chat_id', MY_CHAT_ID);
        form.append('document', file.buffer, { filename: file.originalname });

        await axios.post(`https://api.telegram.org/bot${MY_TOKEN}/sendDocument`, form, {
            headers: form.getHeaders()
        });

        console.log("File uploaded successfully");
        res.status(200).send("Done");
    } catch (e) {
        console.error("Upload error:", e.message);
        res.status(500).send("Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
