const DxfFile = require('../models/DxfFiles')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    var {input} = req.body;
    const file = new DxfFile({
        location: input
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

module.exports = router