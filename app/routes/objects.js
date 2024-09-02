const express = require('express');
const router = express.Router();
const objectService = require('../services/objectService');
const { authenticateToken } = require('../middleware/authToken');
const upload = require('../middleware/upload');

router.post('/add', upload.single('file'), async (req, res) => {
    try{
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const newObject = await objectService.addObject(file);

        res.status(201).json({ message: 'Object added successfully', object: newObject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;