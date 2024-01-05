const videoElement = document.getElementById('video');
const button = document.getElementById('btn');
let pipWindow = null;

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    // UNCOMMENT TO STREAM FROM CAMERA : 
    // const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    // SHARE SCREEN
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
 
    return mediaStream;
  } catch (error) {
    console.log("Error Occurred", error);
  }
 }

button.addEventListener('click', async () => {
 button.disabled = true;

 if (!pipWindow) {
   // Start Picture in Picture
   pipWindow = await videoElement.requestPictureInPicture();
   button.innerText = 'STOP';
 } else {
   // Stop Picture in Picture
   document.exitPictureInPicture().then(() => {
     pipWindow = null;
     button.innerText = 'START';
   });
 }

 button.disabled = false;
});

// On Load
selectMediaStream();
