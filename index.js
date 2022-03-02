const dotenv = require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const s3Config = require('./aws-config/s3-config');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());


app.post('/uploads', async (req, res) => {

    try {
        
        const { files } = req.files;

        if (files) {
            const s3Response = await s3Config.uploadToS3(files);

            if (!s3Response) {
                return res.status(500).json();
            }

            return res.status(200).json();
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json()
    }
});


app.get('/objects/list', async (req, res) => {
    try {

        const objectsList = await s3Config.listObjectsFromS3();

        if (!objectsList) {
            return res.status(500).json();
        }

        return res.status(200).json({ objects: objectsList });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json();
    }
});




app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

