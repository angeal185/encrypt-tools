// FileHashDetector.js

// FileHashDetector constructor
export function FileHashDetector(directoryPath, scanInterval) {
  this.directoryPath = directoryPath;
  this.scanInterval = scanInterval;
  this.knownHashes = {};
  this.timer = null;
}

FileHashDetector.prototype.arrayBufferToHex = function (arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  const hexParts = [];
  for (const byte of byteArray) {
    hexParts.push(byte.toString(16).padStart(2, '0'));
  }
  return hexParts.join('');
};

FileHashDetector.prototype.calculateFileHash = async function (fileContent) {
  const buffer = await crypto.subtle.digest('SHA-256', fileContent);
  return this.arrayBufferToHex(buffer);
};

FileHashDetector.prototype.fetchFile = async function (filePath) {
  const response = await fetch(filePath);
  const fileContent = await response.arrayBuffer();
  return fileContent;
};

FileHashDetector.prototype.scanDirectory = async function () {
  const self = this;

  // Iterate through known files and fetch their content
  for (const fileName in this.knownHashes) {
    const filePath = `${this.directoryPath}/${fileName}`;
    const fileContent = await this.fetchFile(filePath);
    const currentHash = await self.calculateFileHash(fileContent);
    if (currentHash !== self.knownHashes[fileName]) {
      console.log(`File changed: ${fileName}`);
      self.knownHashes[fileName] = currentHash;
    }
  }
};

FileHashDetector.prototype.startScans = function () {
  this.scanDirectory();
  this.timer = setInterval(this.scanDirectory.bind(this), this.scanInterval);
};

FileHashDetector.prototype.stopScans = function () {
  clearInterval(this.timer);
  this.timer = null;
};

export { FileHashDetector };
