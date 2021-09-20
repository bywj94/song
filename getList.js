const path = require("path");
const fs = require("fs");

const allDir = fs.readdirSync(path.resolve(__dirname, "audio"));

let songList = [];
allDir.forEach((dirName) => {
  const p = path.resolve(__dirname, "audio", dirName);
  if (fs.statSync(p).isDirectory()) {
    const allFileName = fs.readdirSync(p);
    const coverIdx = allFileName.findIndex((item) => item === "cover.jpg");
    if (coverIdx > -1) {
      allFileName.splice(coverIdx, 1);
    }
    let list = allFileName.map((fileName) => {
      return {
        name: fileName,
        album: dirName,
        url: `https://cdn.jsdelivr.net/gh/bywj94/song@main/audio/${dirName}/${fileName}`,
        cover: `https://cdn.jsdelivr.net/gh/bywj94/song@main/audio/${dirName}/cover.jpg`,
      };
    });
    songList = songList.concat(list);
  }
});

const fileStr = `const songList = ${JSON.stringify(songList)}`;
fs.writeFileSync(path.resolve(__dirname, "list.js"), fileStr);
