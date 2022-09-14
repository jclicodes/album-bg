const FILETYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

/*
 * Parse file extension from a file name.
 */
const getImageExtension = (fileName) => {
  const dot = fileName.lastIndexOf(".");
  return fileName.slice(dot + 1);
};

/*
 * Parse image name from a `path`.
 */
const getImageName = (path) => {
  const lastDir = path.lastIndexOf("/");
  return path.slice(lastDir + 1);
};

/*
 * Given a file name `fileName`, returns `true` if it's filetype is supported.
 */  
const filetypeSupported = (fileName) => {
  const ext = getImageExtension(fileName);
  const available = Object.keys(FILETYPES);
  console.log(ext, available);

  return available.includes(ext);
};

/*
 * Given a file name `fileName`, returns the MIME type for instantiating 
 * image Buffer objects. 
 */ 
const bufferTypeOf = (fileName) => {
  const extension = getImageExtension(fileName);

  // Safe; args are validated from argstring against filetypeSupported method.
  return FILETYPES[extension];
};

/*
 * Given a `path` describing an existing filesystem path, parses out
 * any file names in the output path.
 */
const parseOutDir = (path) => {
  let subDirs = path.split("/");
  subDirs = subDirs.filter((subDir) => subDir !== "")

  return subDirs.join("/");
};

module.exports = {
  filetypeSupported,
  getImageName,
  parseOutDir,
  bufferTypeOf,
};
