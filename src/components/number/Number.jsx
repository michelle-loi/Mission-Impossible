import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import "./Number.scss";

const URL = "https://teachablemachine.withgoogle.com/models/DJKKoSS6b/";

const Number = ({setPuzzleValue}) => {
  const [isIos, setIsIos] = useState(false);
  const labelContainerRef = useRef(null);
  const webcamContainerRef = useRef(null);
  const responseContainerRef = useRef(null);
  const captureButtonRef = useRef(null); // Create a ref for the button

  let model, webcam, maxPredictions;

  useEffect(() => {
    const detectIos = () => {
      if (window.navigator.userAgent.indexOf("iPhone") > -1 ||
          window.navigator.userAgent.indexOf("iPad") > -1) {
        setIsIos(true);
      }
    };

    detectIos();
    init();
    
    // Add event listener to the button programmatically using the ref
    if (captureButtonRef.current) {
      captureButtonRef.current.addEventListener('click', checkPhoneUnlock);
    }

    return () => {
      // Cleanup: Remove event listener on unmount to avoid memory leaks
      if (captureButtonRef.current) {
        captureButtonRef.current.removeEventListener('click', checkPhoneUnlock);
      }
    };
  }, []);

  const init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
    const flip = true;
    const height = Math.floor(window.innerHeight / 1.5);
    const width = height; // Keep it square for consistency
    
    webcam = new tmImage.Webcam(width, height, flip);
    await webcam.setup();

    if (webcamContainerRef.current) {
        webcamContainerRef.current.innerHTML = ''; // Clear the webcam container
      }

    if (isIos) {
      webcamContainerRef.current.appendChild(webcam.webcam);
      const webCamVideo = document.getElementsByTagName("video")[0];
      webCamVideo.setAttribute("playsinline", true);
      webCamVideo.muted = true;
      webCamVideo.style.width = `${width}px`;
      webCamVideo.style.height = `${height}px`;
      webCamVideo.style.border = "10px solid black";
    } else {
      webcamContainerRef.current.appendChild(webcam.canvas);
      webcam.canvas.style.border = "10px solid black";
    }

    for (let i = 0; i < maxPredictions; i++) {
      labelContainerRef.current.appendChild(document.createElement("div"));
    }

    webcam.play();
    window.requestAnimationFrame(loop);
  };

  const loop = async () => {
    webcam.update();
    window.requestAnimationFrame(loop);
  };

  const checkPhoneUnlock = async () => {
    webcam.pause();
    let prediction = isIos ? await model.predict(webcam.webcam) : await model.predict(webcam.canvas);
    
    let highestProbability = 0;
    let highestClassNumber = 1;

    for (let i = 0; i < maxPredictions; i++) {
      const currentProbability = prediction[i].probability;

      if (currentProbability > highestProbability) {
        highestProbability = currentProbability;
        highestClassNumber = i + 1;
      }

      const classPrediction = `${prediction[i].className}: ${currentProbability.toFixed(2)}`;
      labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
    }

    // checkPrediction(highestProbability.toFixed(2), highestClassNumber);
    
    setPuzzleValue({
      prediction: highestProbability.toFixed(2),
      number: highestClassNumber
    });
  };

  const checkPrediction = (prediction, number) => {
    if (prediction >= 0.90 && number === 2) {
      responseContainerRef.current.innerHTML = "You're Doing Great! " + number;
    } else {
      responseContainerRef.current.innerHTML = "Not the correct pose, please try again :(" + number;
    }
  };

  return (
    <div id="number-container">
      {/* <div id="text-container">Click the picture of the correct answer between 1-10, otherwise you die!</div> */}
      <div id="webcam-container" ref={webcamContainerRef}></div>
      <button id="number-btn" ref={captureButtonRef}>Capture</button>
      <div id="label-container" ref={labelContainerRef}></div>
      <div id="response-container" ref={responseContainerRef}></div>
    </div>
  );
};

export default Number;