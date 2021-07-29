const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3');
const imageMimeTypes = ["application/octet-stream"];

// Grabbing AWS Keys from .env
const awsSecretAccess = process.env.AWS_SECRET_ACCESS
const awsAccessKey = process.env.AWS_ACCESS_KEY
const awsRegion = process.env.AWS_REGION
const awsBucket = process.env.AWS_BUCKET_DXFFILES_TEMP

aws.config.update({
    secretAccessKey: awsSecretAccess,
    accessKeyId: awsAccessKey,
    region: awsRegion
});

const s3 = new aws.S3();

const fileFilter = (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
}

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: awsBucket,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_META_DATA!" });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + Math.random().toString())
        }
    })
})

module.exports = {upload};