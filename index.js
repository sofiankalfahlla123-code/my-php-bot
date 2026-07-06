const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// هذه هي بياناتك التي زودتني بها
const MY_TOKEN = "8865686723:AAEqEmFR1Uw_C77kGR_8Wwdkz5PwdMeeIHk"; 
const MY_CHAT_ID = "6576769234";

app.post('/upload', async (req, res) => {
    const { fileData } = req.body; 
    const url = `https://api.telegram.org/bot${MY_TOKEN}/sendDocument`;
    
    try {
        await axios.post(url, { chat_id: MY_CHAT_ID, document: fileData });
        res.status(200).send("Done");
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.listen(process.env.PORT || 3000);
