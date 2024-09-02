const ObjectModel = require('../models/object');
const path = require('path');

async function addObject(file) {
    if (!file) {
        throw new Error('No file uploaded');
    }

    const folderName = path.parse(file.originalname).name;

    const filePath = `/3Dobj/${folderName}/${file.originalname}`;
    const imagePath = `/3Dobj/${folderName}/${folderName}.png`;

    try {
        const newObject = await ObjectModel.create({
            path: filePath,
            imagePath: imagePath
        });

        return newObject;
    } catch (error) {
        throw new Error(`Error adding object: ${error.message}`);
    }
}

module.exports = {
    addObject
};
