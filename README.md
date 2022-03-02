First of all you will need localstack installed and configured
Execute npm install command on root directory
Execute this command to create a bucket to send files to
aws --endpoint-url=http://localhost:4566 s3 mb s3://bucket-example
