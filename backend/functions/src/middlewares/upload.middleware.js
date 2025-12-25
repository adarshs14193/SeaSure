import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, 
fileFilter :(req, file, cb) =>{
    if(!file.mimetype.startsWith('image/')){
        cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

 }); // Limit file size to 5MB
