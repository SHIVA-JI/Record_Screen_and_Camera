import React, { useState, useRef } from 'react';

const CamRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [linkToDownload, setLinkToDownload] = useState(null);

  const videoRef = useRef(null);

  const startRecording = async () => {
    const isAudio = window.confirm("Want to record with Audio");
    try {
      const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isAudio });

      const recorder = new MediaRecorder(webcamStream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          camStoreChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(camStoreChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'combined-recording.webm';
        setLinkToDownload(a);
        // a.click();
      };

      const camStoreChunks = [];
      setMediaRecorder(recorder);

      videoRef.current.srcObject = webcamStream;
      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setMediaRecorder(null);
      setRecording(false);
    }
  };

  return (
    <>
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Camera Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Camera Recording
      </button>
      
      {linkToDownload && (
            <div>
            Camera  Recorded Video: <a href={linkToDownload.href} download={linkToDownload.download}>Download Recorded Video</a>
            </div>
        )}
    </div>
    <video ref={videoRef}  playsInline autoPlay hidden />

    </>
    
  );
};

export default CamRecorder;
