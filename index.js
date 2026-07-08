const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const upload = multer();

const TOKEN = "8865686723:AAEqEmFR1Uw_C77kGR_8Wwdkz5PwdMeeIHk";
const CHAT_ID = "6576769234";

app.post('/upload', upload.any(), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) return res.status(400).send("No file");

        const file = req.files[0];
        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('document', file.buffer, { filename: file.originalname });

        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendDocument`, form, {
            headers: form.getHeaders()
        });
        res.status(200).send("Success");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// فرض البورت: نستخدم 10000 أو أي رقم متاح إذا رفض Render الافتراضي
const PORT = process.env.PORT || 10000; 

// الاستماع على '0.0.0.0' ضروري جداً في البيئات السحابية ليتمكن التطبيق من الاتصال
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
