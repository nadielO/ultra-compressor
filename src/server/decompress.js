const { decompressFile } = require('../utils/algorithms');

/**
 * Server-side function to handle file decompression.
 * This should be integrated with your server logic to receive file paths for decompression.
 * @param {string} inputFilePath Path to the compressed file to be decompressed.
 * @param {string} outputFilePath Path where the decompressed file should be stored.
 */
const decompressServerFile = async (inputFilePath, outputFilePath) => {
    console.log(`Starting decompression for: ${inputFilePath}`);
    try {
        await decompressFile(inputFilePath, outputFilePath);
        console.log("Decompression completed successfully.");
    } catch (error) {
        console.error('Server-side decompression error:', error.stack);
        // Implement additional error handling logic as needed
        throw new Error('Failed to decompress file. See server logs for more details.');
    }
};

module.exports = decompressServerFile;