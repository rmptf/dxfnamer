const DxfFile = require('../models/DxfFiles')
const NewData = require('../models/NewData')
const express = require('express')
const router = express.Router()
const { upload } = require('../services/file_upload_download')
const aws = require('aws-sdk')
const getNames = require('../services/get_names');

router.post('/file', upload.single('dxfFile'), async (req, res) => {
    const awsBucket = process.env.AWS_BUCKET_DXFFILES_TEMP
    const uploaded = req.file.location
    const key = req.file.key
    const file = new DxfFile({
        location: uploaded
    })

    new aws.S3().getObject({ Bucket: awsBucket, Key: key }, async function(err, data) {
        if (!err){
            const fileDataAsString = data.Body.toString()
            const oldNames = getNames(fileDataAsString)
            try{
                await file.save()
                res.render('./', {
                    oldNames: oldNames
                })
            } catch(err){
                console.log(err)
                res.redirect('./')
            }
        }
    });
})
router.post('/newData', async (req, res) => {
    var {newName, comment} = req.body;
    const file = new NewData({
        newName: newName,
        comment: comment
    })
    try{
        await file.save()
        console.log("SUCCESS")
        res.redirect('./')
    } catch(err){
        console.log("FAIL")
        console.log(err)
        res.redirect('./')
    }
})

// router.post('/', async (req, res) => {
//     var {input} = req.body;
//     const file = new DxfFile({
//         location: input
//     })
//     try{
//         await file.save()
//         console.log("SUCCESS")
//         res.redirect('./')
//     } catch(err){
//         console.log("FAIL")
//         console.log(err)
//         res.redirect('./')
//     }
// })

module.exports = router