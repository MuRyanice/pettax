const sharp = require('sharp');
const fs = require('fs').promises;

async function generateImages() {
    // Generate favicons
    const favicon = await fs.readFile('images/favicon.svg');
    await sharp(favicon)
        .resize(16, 16)
        .toFile('images/favicon-16x16.png');
    await sharp(favicon)
        .resize(32, 32)
        .toFile('images/favicon-32x32.png');
    await sharp(favicon)
        .resize(180, 180)
        .toFile('images/apple-touch-icon.png');
    await sharp(favicon)
        .resize(32, 32)
        .toFile('images/favicon.ico');
    
    // Generate og-image
    const ogImage = await fs.readFile('images/og-image.svg');
    await sharp(ogImage)
        .resize(1200, 630)
        .toFile('images/og-image.png');
}

generateImages(); 