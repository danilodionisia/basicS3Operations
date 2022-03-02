const dotenv = require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());


app.post('/uploads', async (req, res) => {

    try {
        
        const { files } = req.files;

        

        return res.status(200).json();
    } catch (err) {
        console.error(err);
        return res.status(500).json()
    }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

