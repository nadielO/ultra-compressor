// File: src/server/compress.js

const { compressFile } = require('../utils/algorithms');

/**
 * Server-side function to handle file compression.
 * This should be integrated with your server logic to receive file paths for compression.
 * @param {string} inputFilePath Path to the input file to be compressed.
 * @param {string} outputFilePath Path where the compressed file should be stored.
 */
const compressServerFile = async (inputFilePath, outputFilePath) => {
    console.log(`Starting compression for: ${inputFilePath}`);
    try {
        await compressFile(inputFilePath, outputFilePath);
        console.log("Compression completed successfully.");
    } catch (error) {
        console.error('Server-side compression error:', error.stack);
        // Implement additional error handling logic as needed
        throw new Error('Failed to compress file. See server logs for more details.');
    }
};

module.exports = compressServerFile;