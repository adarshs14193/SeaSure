import {storage} from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (buffer, mimetype, vendorId) => {
    const bucket = storage.bucket();

    const fileName = `catches/${vendorId}/${uuidv4()}.jpg`;
    const file = bucket.file(fileName);

    await file.save(buffer, {
        contentType: mimetype,
        resumable: false,
        public: true,
    });

    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;

}