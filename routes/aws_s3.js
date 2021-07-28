const DxfFile = require('../models/DxfFiles')
const express = require('express');
const router = express.Router();
const { upload, download } = require('../services/file_upload_download')

router.post('/', upload.single('dxfFile'), async (req, res) => {
    const uploaded = req.file.location
    const key = req.file.key
    
    const file = new DxfFile({
        location: uploaded
    })

    download(key)
        
    try{
        await file.save()
        res.render('./', {
            data: "BOGUUUUUUUUUUUS"
        })
    } catch(err){
        console.log(err)
        res.redirect('./')
    }
})

module.exports = router;