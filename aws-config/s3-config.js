const AWS = require('aws-sdk');
const awsConfig = process.env;

const params = {
    accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
    endpoint: awsConfig.ENDPOINT,
    region: awsConfig.REGION,
    s3ForcePathStyle: true,
};

const S3 = new AWS.S3(params);

exports.uploadToS3 = async (file) => {

    try {
        
        const s3Params = {
            Bucket: awsConfig.BUCKET,
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