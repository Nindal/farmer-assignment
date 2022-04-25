const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'app/util/file' });
const router = express.Router();
const verifySignUp = require('./../middleware/auth.middleware');
const  { uploadData, showData }  = require('./../controllers/farmer.controller');

router.post('/upload-csv',verifySignUp.verifyToken,upload.single('data'),uploadData);

router.get('/show-data',verifySignUp.verifyToken,showData);

module.exports = router;