const zlib = require('zlib');
const util = require('util');
const fs = require('fs');

// Promisify the zlib and fs functions for use with async/await
const gzip = util.promisify(zlib.gzip);
const gunzip = util.promisify(zlib.gunzip);
const brotliCompress = util.promisify(zlib.brotliCompress);
const brotliDecompress = util.promisify(zlib.brotliDecompress);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Compresses a file using Gzip.
 * @param {string} inputFilePath Path to the input file.
 * @param {string} outputFilePath Path where the compressed file will be saved.
 */
exports.compressFile = async (inputFilePath, outputFilePath) => {
    try {
        const fileBuffer = await readFile(inputFilePath);
        const compressed = await gzip(fileBuffer);
        await writeFile(outputFilePath, compressed);
        console.log(`File compressed successfully: ${outputFilePath}`);
    } catch (error) {
        console.error('Compression error:', error.stack);
        throw error; // Rethrow to handle the error further up the chain
    }
};

/**
 * Decompresses a file using Gunzip.
 * @param {string} inputFilePath Path to the compressed file.
 * @param {string} outputFilePath Path where the decompressed file will be saved.
 */
exports.decompressFile = async (inputFilePath, outputFilePath) => {
    try {
        const fileBuffer = await readFile(inputFilePath);
        const decompressed = await gunzip(fileBuffer);
        await writeFile(outputFilePath, decompressed);
        console.log(`File decompressed successfully: ${outputFilePath}`);
    } catch (error) {
        console.error('Decompression error:', error.stack);
        throw error; // Rethrow to handle the error further up the chain
    }
};

/**
 * Compresses a file using Brotli.
 * @param {string} inputFilePath Path to the input file.
 * @param {string} outputFilePath Path where the compressed file will be saved.
 */
exports.compressFileBrotli = async (inputFilePath, outputFilePath) => {
    try {
        const fileBuffer = await readFile(inputFilePath);
        const compressed = await brotliCompress(fileBuffer);
        await writeFile(outputFilePath, compressed);
        console.log(`File compressed with Brotli successfully: ${outputFilePath}`);
    } catch (error) {
        console.error('Brotli compression error:', error.stack);
        throw error;
    }
};

/**
 * Decompresses a file using Brotli.
 * @param {string} inputFilePath Path to the compressed file.
 * @param {string} outputFilePath Path where the decompressed file will be saved.
 */
exports.decompressFileBrotli = async (inputFilePath, outputFilePath) => {
    try {
        const fileBuffer = await readFile(inputFilePath);
        const decompressed = await brotliDecompress(fileBuffer);
        await writeFile(outputFilePath, decompressed);
        console.log(`File decompressed with Brotli successfully: ${outputFilePath}`);
    } catch (error) {
        console.error('Brotli decompression error:', error.stack);
        throw error;
    }
};