import { compressFile } from '../../src/client/compress';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    blob: () => Promise.resolve(new Blob(['compressed file content'], { type: 'application/zip' })),
  })
);

describe('Client-side compression', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should successfully compress a file', async () => {
    console.log('Testing successful file compression...');
    const file = new Blob(['file content'], { type: 'text/plain' });
    const result = await compressFile(file);
    expect(result).toBeInstanceOf(Blob);
    console.log('File compressed successfully.');
  });

  it('should throw an error for a failed compression', async () => {
    console.log('Testing failed file compression...');
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false, statusText: 'Internal Server Error' }));
    await expect(compressFile(new Blob(['file content']))).rejects.toThrow("Server responded with an error: Internal Server Error");
    console.error('Compression test encountered an error: Server responded with an error: Internal Server Error');
  });
});