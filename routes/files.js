const DxfFile = require('../models/DxfFiles')
const express = require('express')
const router = express.Router()

// router.get('/', (req, res) => {
//     res.render('index')
// })

// router.get('/file', async (req, res) => {
//     res.render("/file", { 
//     });
// });

// router.get('/', async (req, res) => {
//     try {
//     const files = await DxfFile.find() 
//     res.json(files)
//     } catch(err) {
//         res.json({ message: err.message })
//     }
// })


// router.get('/:id', (req, res) => {
    
// })

router.post('/', async (req, res) => {
    var {input} = req.body;
    console.log(input)
    const file = new DxfFile({
        address: input
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