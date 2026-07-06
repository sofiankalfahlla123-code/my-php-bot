const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/upload', async (req, res) => {
    const { token, chatId, fileData } = req.body;
    const url = `https://api.telegram.org/bot${token}/sendDocument`;
    try {
        await axios.post(url, { chat_id: chatId, document: fileData });
        res.status(200).send("Done");
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.listen(process.env.PORT || 3000);
