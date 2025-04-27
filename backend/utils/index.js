const path = require("path");
const fs = require("fs");

// Ensure the upload directory exists
const ensureUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

module.exports = {
  ensureUploadDir
};