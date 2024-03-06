import { decompressFile } from '../../src/client/decompress';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    blob: () => Promise.resolve(new Blob(['decompressed file content'], { type: 'text/plain' })),
  })
);

describe('Client-side decompression', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should successfully decompress a file', async () => {
    console.log('Testing successful file decompression...');
    const file = new Blob(['compressed file content'], { type: 'application/zip' });
    const result = await decompressFile(file);
    expect(result).toBeInstanceOf(Blob);
    console.log('File decompressed successfully.');
  });

  it('should throw an error for a failed decompression', async () => {
    console.log('Testing failed file decompression...');
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false, statusText: 'Internal Server Error' }));
    await expect(decompressFile(new Blob(['compressed file content']))).rejects.toThrow("Server responded with an error.");
    console.error('Decompression test encountered an error: Server responded with an error: Internal Server Error');
  });
});