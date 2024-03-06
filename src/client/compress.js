async function compressFile(file) {
  console.log('Preparing file for compression.');
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Sending file to server for compression.');
    const response = await fetch('/compress', { // Endpoint updated as per project conventions
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with an error: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log('File compressed successfully.');
    return blob;
  } catch (error) {
    console.error('Compression error:', error.stack);
    throw error;
  }
}

// Export the compressFile function for usage in other modules
export { compressFile };