const decompressServerFile = require('../../src/server/decompress');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

// Mocking utility function
jest.mock('../../src/utils/algorithms', () => ({
  decompressFile: jest.fn(() => Promise.resolve()),
}));

describe('Server-side decompression', () => {
  const inputFilePath = 'path/to/compressed/file';
  const outputFilePath = 'path/to/decompressed/file';

  afterAll(async () => {
    // Clean up: remove any generated files
    try {
      await unlinkAsync(outputFilePath);
      console.log(`Cleanup successful: ${outputFilePath}`);
    } catch (error) {
      console.error(`Cleanup failed for ${outputFilePath}:`, error.stack);
    }
  });

  it('should call decompressFile without throwing an error', async () => {
    await expect(decompressServerFile(inputFilePath, outputFilePath)).resolves.not.toThrow();
    console.log(`Decompression test passed for input: ${inputFilePath} and output: ${outputFilePath}`);
  });
});