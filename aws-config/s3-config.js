const AWS = require('aws-sdk');
const awsConfig = process.env;

const params = {
    accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
    endpoint: awsConfig.ENDPOINT,
    region: awsConfig.REGION,
    s3ForcePathStyle: true,
};

const bucket = awsConfig.BUCKET;

const S3 = new AWS.S3(params);

exports.uploadToS3 = async (file) => {

    try {
        
        const s3Params = {
            Bucket: bucket,
            Body: file.data,
            Key: file.name,
        };

        await S3.upload(s3Params).promise();

        return true;

    } catch (err) {
        console.error(err);
        return false;
    }
};


exports.listObjectsFromS3 = async () => {

    try {
        
        const objectsList = new Array();

        const s3Params = {
            Bucket: bucket,
        };

        const objects = await S3.listObjects(s3Params).promise();

        if (objects.Contents) {
            
            for (const content of objects.Contents.values()) {
                objectsList.push(content.Key);
            }

        }
        
        return objectsList;

    } catch (err) {
        console.error(err);
        return false;
    }
}