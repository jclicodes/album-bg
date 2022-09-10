const FILETYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

const getOutputImageExtension = (fileName) => {
  const dot = fileName.indexOf(".");
  return fileName.slice(dot + 1);
};

const filetypeSupported = (fileName) => {
  const ext = getOutputImageExtension(fileName);
  const available = Object.keys(FILETYPES);

  return available.includes(ext);
};

const bufferTypeOf = (fileName) => {
  const extension = getOutputImageExtension(fileName);

  // Safe; args are validated from argstring against filetypeSupported method.
  return FILETYPES[extension];
};

module.exports = { filetypeSupported, getOutputImageExtension, bufferTypeOf };

