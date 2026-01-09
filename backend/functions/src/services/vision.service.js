import axios from 'axios';
import FormData from 'form-data';

// Your deployed ML API endpoint (update after deployment)
const ML_API_URL = process.env.ML_API_URL || 'http://35.200.179.245:8080';

/**
 * Download image from URL and return as buffer
 */
const downloadImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    return Buffer.from(response.data);
  } catch (error) {
    throw new Error(`IMAGE_DOWNLOAD_FAILED: ${error.message}`);
  }
};

/**
 * Analyze fish image using ML API
 * 
 * @param {string} eyeImageUrl - URL of fish eye image
 * @param {string} gillImageUrl - URL of fish gill image (optional for now)
 * @returns {Promise<{freshness: string, confidenceScore: number}>}
 */
export const analyzeFishImage = async (eyeImageUrl, gillImageUrl = null) => {
  if (!eyeImageUrl) {
    throw new Error("IMAGE_URL_REQUIRED");
  }

  try {
    // Download images
    const eyeImageBuffer = await downloadImage(eyeImageUrl);
    
    // If no gill image provided, use eye image for both (temporary solution)
    const gillImageBuffer = gillImageUrl 
      ? await downloadImage(gillImageUrl)
      : eyeImageBuffer;

    // Prepare form data
    const formData = new FormData();
    formData.append('eye_image', eyeImageBuffer, {
      filename: 'eye.jpg',
      contentType: 'image/jpeg'
    });
    formData.append('gill_image', gillImageBuffer, {
      filename: 'gill.jpg',
      contentType: 'image/jpeg'
    });

    // Call ML API
    const response = await axios.post(
      `${ML_API_URL}/predict`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 60000 // 60 second timeout
      }
    );

    if (response.data.status !== 'success') {
      throw new Error('ML_API_RETURNED_FAILURE');
    }

    const result = response.data.result;
    const prediction = result.prediction;

    // Map ML freshness class to your app's format
    let freshness;
    switch (prediction.freshness_class) {
      case 'HIGHLY_FRESH':
        freshness = 'FRESH';
        break;
      case 'FRESH':
        freshness = 'MODERATE';
        break;
      case 'NOT_FRESH':
        freshness = 'SPOILED';
        break;
      default:
        freshness = 'MODERATE';
    }

    return {
      freshness,
      confidenceScore: Math.round(prediction.confidence)
    };

  } catch (error) {
    if (error.response) {
      throw new Error(`ML_API_ERROR: ${error.response.data.detail || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('ML_API_NO_RESPONSE');
    } else {
      throw new Error(`VISION_ANALYSIS_FAILED: ${error.message}`);
    }
  }
};

/**
 * Health check for ML API
 */
export const checkMLApiHealth = async () => {
  try {
    const response = await axios.get(`${ML_API_URL}/health`, {
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    throw new Error('ML_API_UNAVAILABLE');
  }
};