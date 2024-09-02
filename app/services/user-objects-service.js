const User = require('../models/user');
const ObjectModel = require('../models/object');
const UserObject = require('../models/user-objects');
const path = require('path');
const fs = require('fs');


async function addObjectToUserLibrary (userId, objectId) {
    try{
        const user = await User.findByPk(userId);
        const object = await ObjectModel.findByPk(objectId);

        if(!user || !object){
            throw new Error('User or object not found');
        }

        console.log(userId + ' ' + objectId);
        await UserObject.create({
            UserId: userId,
            ObjectId: objectId,
        });

        return {message: 'Object added to the library'};
    } catch (error) {
        console.error('Error adding object to library: ', error. message);
        throw error;
    }
}

async function getUserObjects(userId) {
    try {
        const user = await User.findByPk(userId, {
            include: {
                model: ObjectModel,
                through: { attributes: [] }
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user.Objects.map(object => ({
            id: object.id,
            path: path.basename(object.path)
        }));
    } catch (error) {
        throw error;
    }
}

async function getUserObjectFilePath(userId, objectId) {
    try {
        const userObject = await UserObject.findOne({
            where: { UserId: userId, ObjectId: objectId }
        });

        if (!userObject) {
            throw new Error('Object not found in user library');
        }

        const object = await ObjectModel.findByPk(objectId);

        if (!object) {
            throw new Error('Object details not found');
        }

        
        console.log("object.path = " + object.path);
        const filePath = path.join(__dirname, '../public', object.path);

        console.log(`Constructed file path: ${filePath}`);

        if (!fs.existsSync(filePath)) {
            throw new Error('File not found on server');
        }

        return filePath;
    } catch (error) {
        console.error('Error getting object file path: ', error.message);
        throw error;
    }
}

module.exports = {
    getUserObjects,
    addObjectToUserLibrary,
    getUserObjectFilePath,
};
