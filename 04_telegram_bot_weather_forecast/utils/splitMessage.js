export const splitMessage = (message, chunkSize) => {
    const chunks = [];
  
    for (let i = 0; i < message.length; i += chunkSize) {
      chunks.push(message.substring(i, i + chunkSize));
    }
  
    return chunks;
  };