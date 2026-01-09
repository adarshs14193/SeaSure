import axios from 'axios';

// RAG Recipe API endpoint
const RAG_API_URL = process.env.RAG_API_URL;

/**
 * Get recipes from RAG endpoint
 * 
 * @param {Object} params - Recipe search parameters
 * @param {string} params.fish - Fish name (required)
 * @param {string} params.location - Location/cuisine (optional, default: "Kerala")
 * @param {string} params.spiceLevel - Spice level (optional: "mild", "medium", "hot")
 * @param {string} params.habit - Eating habit (optional: "regular", "occasional")
 * @returns {Promise<Object>} Recipe data with bone warnings and recipe suggestions
 */
export const getRecipes = async ({ fish, location = 'Kerala', spiceLevel = 'medium', habit = 'regular' }) => {
    if (!fish) {
        throw new Error('FISH_NAME_REQUIRED');
    }

    try {
        console.log(`🍽️ Fetching recipes for ${fish} from ${location}`);

        const response = await axios.post(
            `${RAG_API_URL}/rag`,
            {
                fish,
                location,
                spice_level: spiceLevel,
                habit
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            }
        );

        console.log('✅ RAG API response received');

        // Handle the response structure
        const data = response.data;

        // Parse recipes if they're in raw_output (as shown in your example)
        let recipes = data.recipes;
        
        if (recipes && recipes.error && recipes.raw_output) {
            // Try to parse the raw_output JSON
            try {
                const cleanedOutput = recipes.raw_output.trim();
                recipes = JSON.parse(cleanedOutput);
            } catch (parseError) {
                console.warn('Could not parse raw_output, using as-is');
                recipes = {
                    error: recipes.error,
                    raw: recipes.raw_output
                };
            }
        }

        return {
            fish: data.fish || fish,
            location: data.location || location,
            boneWarning: data.bone_warning || [],
            recipes: Array.isArray(recipes) ? recipes : [],
            hasError: !!(recipes && recipes.error),
            rawData: data
        };

    } catch (error) {
        console.error('❌ RAG API error:', error.message);

        if (error.response) {
            throw new Error(`RAG_API_ERROR: ${error.response.data?.error || error.response.statusText}`);
        } else if (error.request) {
            throw new Error('RAG_API_NO_RESPONSE: Recipe service unavailable');
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('RAG_API_TIMEOUT: Request took too long');
        } else {
            throw new Error(`RECIPE_FETCH_FAILED: ${error.message}`);
        }
    }
};

/**
 * Health check for RAG API
 */
export const checkRecipeApiHealth = async () => {
    try {
        const response = await axios.get(`${RAG_API_URL}/health`, {
            timeout: 5000
        });
        console.log('✅ Recipe API is healthy');
        return {
            status: 'healthy',
            url: RAG_API_URL,
            ...response.data
        };
    } catch (error) {
        console.error('❌ Recipe API health check failed:', error.message);
        throw new Error('RECIPE_API_UNAVAILABLE');
    }
};