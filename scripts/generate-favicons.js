const sharp = require('sharp');
const fs = require('fs').promises;

async function generateFavicons() {
    const svg = await fs.readFile('images/favicon.svg');
    
    // Generate PNG favicons
    await sharp(svg)
        .resize(16, 16)
        .toFile('images/favicon-16x16.png');
    
    await sharp(svg)
        .resize(32, 32)
        .toFile('images/favicon-32x32.png');
    
    await sharp(svg)
        .resize(180, 180)
        .toFile('images/apple-touch-icon.png');
    
    // Generate ICO file
    await sharp(svg)
        .resize(32, 32)
        .toFile('images/favicon.ico');
}

generateFavicons(); 