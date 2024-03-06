const compressServerFile = require('../../src/server/compress');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

// Mock the utility function to prevent actual file operations during tests
jest.mock('../../src/utils/algorithms', () => ({
  compressFile: jest.fn(() => Promise.resolve()),
}));

describe('Server-side compression', () => {
  const inputFilePath = 'path/to/input/file';
  const outputFilePath = 'path/to/output/file';

  afterAll(async () => {
    // Clean up: remove any generated files
    try {
      await unlinkAsync(outputFilePath);
      console.log(`Test cleanup: Successfully removed ${outputFilePath}`);
    } catch (error) {
      console.error(`Test cleanup: Failed to remove ${outputFilePath}. Error:`, error.stack);
    }
  });

  it('should call compressFile without throwing an error', async () => {
    await expect(compressServerFile(inputFilePath, outputFilePath)).resolves.not.toThrow();
    console.log("Server-side compression test passed: compressFile called without throwing an error.");
  });
});