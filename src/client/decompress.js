async function decompressFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/decompress', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Server responded with an error status:', response.status);
      throw new Error('Server responded with an error.');
    }

    const blob = await response.blob();
    console.log('File decompressed successfully.');
    return blob;
  } catch (error) {
    console.error('Decompression error:', error.message, error.stack);
    throw error;
  }
}

// Export the decompressFile function for usage in other modules
export { decompressFile };