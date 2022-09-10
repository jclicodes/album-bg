const FILETYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

const filetypeSupported = (fileName) => {
  const dot = fileName.indexOf(".");
  const ext = fileName.slice(dot);

  const available = Object.keys(FILETYPES);

  return available.includes(ext);
};

module.exports = { filetypeSupported };

