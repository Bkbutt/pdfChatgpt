const express= require('express');
const router = express.Router();
const multer = require('multer')
const PDFParser = require('pdf-parse')
const {parsePdf}= require("../controllers/pdfController")
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads'); // PDFs will be stored in the 'uploads' folder
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname)
    },
  });
const upload = multer({ storage: storage })
router.post('/parsePdf',upload.single('pdf'),parsePdf)

module.exports=router

