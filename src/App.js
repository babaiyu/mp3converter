import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import {regexFile, removeSpaceName} from './helpers';

const message = document.getElementById('message');

function main() {
  const ffmpeg = createFFmpeg({
    progress: ({ratio}) => {
      message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
    },
  });
  
  const transcode = async ({target: {files}}) => {
    document.getElementById('load').style.visibility = 'visible';
    const {name} = files[0];
    const fileName = regexFile(name);
    const realName = removeSpaceName(name);
    message.innerHTML = 'Loading ffmpeg-core.js';
    await ffmpeg.load();
    message.innerHTML = 'Working on to refresh Your Ears!!';
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name, `${realName}.mp3`);
    message.innerHTML = 'Downloading Your Song......';
    location.reload();
    const data = ffmpeg.FS('readFile', `${realName}.mp3`);

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

let spinnerWrapper = document.querySelector('.spinner-wrapper');

    window.addEventListener('load', function () {
      
      spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    });



export default main;
