import {uploadImage} from "../services/storage.service.js";
import {createScan}from "../models/consumerScan.model.js";

export const createConsumerScan = async (req, res) => {
    try{
        const consumerId = req.user.id;

        if(!req.file){
            return res.status(400).json({error: 'Scan image file is required'});
        }

        // Upload image to storage
        const imageUrl = await uploadImage(
            req.file.buffer,
            req.file.mimetype,
            consumerId
        );

        // Create scan record in database
        const scan = await createScan({
            consumerId,
            imageUrl
        });

        // Respond with success
        return res.status(201).json({success: true, scanId: scanDoc.id});
    } catch (error) {
        console.error('Error creating scan:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};