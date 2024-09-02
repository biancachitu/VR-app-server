const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../services/authService');
const userObjectService = require('../services/user-objects-service');
const { generateToken, authenticateToken } = require('../middleware/authToken');
const path = require('path');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        await registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user: ', error.message);
        res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await loginUser(email, password);
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(401).json({ error: 'Invalid email or password' });
    }
});


router.post('/library/add', authenticateToken, async (req, res) => {
    const { objectId } = req.body;

    if (!objectId) {
        return res.status(400).json({ error: 'Object ID is required' });
    }

    try {
        const userId = req.user.id; 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing' });
        }
        const result = await userObjectService.addObjectToUserLibrary(userId, objectId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding object to library:', error.message);
        res.status(500).json({ error: 'Error adding object to library' });
    }
});

router.get('/library', authenticateToken, async (req, res) => {
    try {
        const userObjects = await userObjectService.getUserObjects(req.user.id);
        res.status(200).json({ objects: userObjects });
        console.log(userObjects.json);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user objects' });
    }
});

router.get('/download/:objectId', authenticateToken, async (req, res) => {
    try {
        const { objectId } = req.params;
        const userId = req.user.id;

        const filePath = await userObjectService.getUserObjectFilePath(userId, objectId);
        const fileName = path.basename(filePath);

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err.stack);
                res.status(500).json({ error: 'Error sending file' });
            }
        });
    } catch (error) {
        console.error('Error handling download request:', error.stack);
        res.status(500).json({ error: 'Error handling download request' });
    }
});

module.exports = router;
