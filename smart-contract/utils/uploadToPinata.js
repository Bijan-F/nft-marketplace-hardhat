const pinataSDK = require('@pinata/sdk');
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const pinataApiKey = process.env.PINATA_API;
const pinataApiSecret = process.env.PINATA_SECRET;
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

async function storeImages(imagesFilePath) {
  const fullImagesPath = path.resolve(imagesFilePath);
  const files = fs.readdirSync(fullImagesPath);
  let responses = [];
  console.log("Uploading to IPFS!");
  for (fileIndex in files) {
    const readableStreamForFile = fs.createReadStream(`${imagesFilePath}/${files[fileIndex]}`);
    try {
      const response = await pinata.pinFileToIPFS(readableStreamForFile);
      responses.push(response);
    } catch(error) {
      console.error(error);
    };
  };

  return { responses, files };
};

async function storeTokenUriMetadata(metadata) {
  try {
    const response = await pinata.pinJSONToIPFS(metadata);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

module.exports = {
    storeImages,
    storeTokenUriMetadata
};