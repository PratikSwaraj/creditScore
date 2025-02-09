const express = require('express');
const multer = require('multer');
const xml2js = require('xml2js');
const { saveData } = require('../controllers/saveData');
const Report = require('../models/report'); // Import the Report model

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    console.log('File uploaded:', req.file);
    const parser = new xml2js.Parser();
    const xml = req.file.buffer.toString();
    console.log('Parsing XML...');
    const result = await parser.parseStringPromise(xml);
    console.log('XML parsed:', result);

    // Save data to the database
    await saveData(result);
    console.log('Data saved to database.');
    res.status(200).json({ message: 'File processed and data saved.' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

// Add data retrieval endpoint
router.get('/data', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

module.exports = router;
