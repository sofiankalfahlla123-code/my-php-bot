const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const upload = multer(); // استلام الملف في الذاكرة

const TOKEN = "8865686723:AAEqEmFR1Uw_C77kGR_8Wwdkz5PwdMeeIHk";
const CHAT_ID = "6576769234";

// مسار مفتوح تماماً
app.post('/upload', upload.any(), async (req, res) => {
    try {
        console.log("استلمت طلباً جديداً...");
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).send("No file found in request");
        }

        const file = req.files[0];
        
        // تجهيز البيانات لتليجرام
        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('document', file.buffer, { filename: file.originalname || 'file' });

        // التوجيه المباشر
        const url = `https://api.telegram.org/bot${TOKEN}/sendDocument`;
        await axios.post(url, form, { headers: form.getHeaders() });

        console.log("تم التوجيه بنجاح!");
        res.status(200).send("Success");
    } catch (e) {
        console.error("خطأ سيرفر:", e.response ? e.response.data : e.message);
        res.status(500).send("Error");
    }
});

app.listen(process.env.PORT || 3000);
