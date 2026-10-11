// Writes dist/: an index page and FILE_COUNT small pages in folders of 500, or, with BIG_FILE_MB, one large file.
// Strux limits a build's output (10,000 files, 64 MB per file, 256 MB in all), so the numbers below decide whether
// a Build is accepted. Run with `npm run build`.
import {mkdir, rm, writeFile} from "node:fs/promises";

const FILE_COUNT = Number(process.env.FILE_COUNT ?? 10050);
const BIG_FILE_MB = Number(process.env.BIG_FILE_MB ?? 0);

await rm("dist", {recursive: true, force: true});
await mkdir("dist", {recursive: true});
await writeFile("dist/index.html", `<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>Page farm</title></head><body><h1>Page farm</h1><p>${FILE_COUNT} pages${BIG_FILE_MB ? ` and a ${BIG_FILE_MB} MB file` : ""}.</p></body></html>\n`);
for (let index = 0; index < FILE_COUNT; index += 1) {
  const folder = `dist/pages/${Math.floor(index / 500)}`;
  if (index % 500 === 0) await mkdir(folder, {recursive: true});
  await writeFile(`${folder}/${index}.html`, `<!doctype html><title>Page ${index}</title><p>Page ${index}</p>\n`);
}
if (BIG_FILE_MB) await writeFile("dist/big.bin", Buffer.alloc(BIG_FILE_MB * 1024 * 1024, 7));
console.log(`Wrote ${FILE_COUNT + 1}${BIG_FILE_MB ? " + 1 large" : ""} files into dist/`);
