import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import {regexFile} from './helpers';

const message = document.getElementById('message');

function main() {
  const ffmpeg = createFFmpeg({
    progress: ({ratio}) => {
      message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
    },
  });

  const transcode = async ({target: {files}}) => {
    const {name} = files[0];
    const fileName = regexFile(name);
    message.innerHTML = 'Loading ffmpeg-core.js';
    await ffmpeg.load();
    message.innerHTML = 'Start transcoding';
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name, `${fileName}.mp3`);
    message.innerHTML = 'Complete transcoding';
    const data = ffmpeg.FS('readFile', `${fileName}.mp3`);

    const audio = document.getElementById('output-music');
    const fileReadyDownload = URL.createObjectURL(
      new Blob([data.buffer], {type: 'audio/mpeg'}),
    );
    audio.src = fileReadyDownload;

    // Download after transcoded to mp3
    let aDownload = document.createElement('a');
    aDownload.setAttribute('href', fileReadyDownload);
    aDownload.setAttribute('download', `${fileName}.mp3`);
    aDownload.append('body');
    aDownload.click();
    aDownload.remove();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btnTranscode = document.getElementById('uploader');

    btnTranscode.addEventListener('change', transcode);
  });
}

export default main;
