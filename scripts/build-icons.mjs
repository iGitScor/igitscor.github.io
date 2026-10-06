// Regenerates the raster icons from public/favicon.svg.
// usage: node scripts/build-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../public/', import.meta.url));
const svg = readFileSync(`${dir}favicon.svg`);
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

writeFileSync(`${dir}apple-touch-icon.png`, await png(180));

// An .ico file may hold a PNG as is: a 6-byte header, one 16-byte entry, then the image.
const icon = await png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(icon.length, 14);
header.writeUInt32LE(22, 18); // offset of the image
writeFileSync(`${dir}favicon.ico`, Buffer.concat([header, icon]));

console.log('apple-touch-icon.png (180), favicon.ico (32)');
