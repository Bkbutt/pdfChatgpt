
const PDFParser = require('pdf-parse')

exports.parsePdf= async(req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
  
    const pdfBuffer = req.file.buffer
  
    // Use pdf-parse to extract text from the PDF
    PDFParser(pdfBuffer)
      .then(data => {
        res.json({ text: data.text });
      })
      .catch(err => {
        res.status(500).json({ error: 'Error parsing PDF file' });
      })
  }

  
  
  
  
  
  