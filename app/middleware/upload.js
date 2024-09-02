const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderName = path.parse(file.originalname).name;
    
        const folderPath = path.join(__dirname, '../public/3Dobj', folderName);
    
        fs.mkdirSync(folderPath, { recursive: true });
    
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
    

const upload = multer({ storage: storage });
    
module.exports = upload;
