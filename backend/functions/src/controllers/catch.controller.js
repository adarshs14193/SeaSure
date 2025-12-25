import {uploadImage} from "../services/storage.service.js";
import {createCatch} from "../services/catch.model.js";

export const uploadCatch = async (req, res) => {
    try{
        const vendorId = req.user.id;

        if(!req.file){
            return res.status(400).json({error: 'Image file is required'});
        }

        const imageUrl = await uploadImage(
            req.file.buffer,
            req.file.mimetype,
            vendorId
        ); // req.file.buffer contains the image data
        // Save catch details to database

        const catchDoc = await createCatch({
            vendorId,
            imageUrl,
            // Add other catch details from req.body as needed
        }); // Save catch details to database

        return res.status(201).json({success : true, catchId: catchDoc.id});
    } catch (error) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};