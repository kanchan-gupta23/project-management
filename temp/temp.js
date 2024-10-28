const fs = require('fs').promises;
const path = require('path');

const tempDir = path.join(__dirname, 'temp');

async function ensureTempDir() {
    try {
        await fs.access(tempDir);
        console.log('/temp/ directory already exists');
    } catch {
        await fs.mkdir(tempDir);
        console.log('/temp/ directory created');
    }
}

ensureTempDir();
