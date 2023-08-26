import React, { useState, useRef } from 'react';
import CamRecorder from './CamRecorder';

const Record = () => {
    const [recording, setRecording] = useState(false);
    const [mediaRecordering, setMediaRecordering] = useState(null);
    const [linkToDownload, setLinkToDownload] = useState(null);

    const videoRef = useRef(null);
    
    
    const startRecord = async () => {
        try{
            const screenStream = await navigator.mediaDevices.getDisplayMedia({video:true , audio:true});

            const mRecorder = new MediaRecorder(screenStream);
            mRecorder.ondataavailable = (event) =>{
                if(event.data.size > 0) {
                    screenStoreChunks.push(event.data);
                }
            };

            

            mRecorder.onstop = () =>{
                document.querySelector("video")
                .src = URL.createObjectURL(
                    new Blob(screenStoreChunks,{type:'video/webm'})
                ) 
                const blob = new Blob(screenStoreChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'screen-recording.webm';
                setLinkToDownload(a);
                // a.click();
            }

            const screenStoreChunks=[];

            
            setMediaRecordering(mRecorder);
            videoRef.current.srcObject = screenStream;
            mRecorder.start();
            setRecording(true);
        }
        catch(error) {
            console.log("Error in startRecord ");
        }

    }
        
    const stopRecord = () => {
        if(mediaRecordering) {
            mediaRecordering.stop();
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            setMediaRecordering(null);
            setRecording(false);
        }
    }




    return(
        <>
        {/* <video height="400vh" width="600vw" ref={videoRef} controls autoPlay playsInline></video>   */}
         
        <div>
            <button onClick={startRecord} disabled={recording}>
                Start Screen Recording
            </button>
            
            <button onClick={stopRecord} disabled={!recording}>
                Stop Screen Recording
            </button>

            {linkToDownload && (
                <div>
                Screen Recorded Video: <a href={linkToDownload.href} download={linkToDownload.download}>Download Recorded Video</a>
                </div>
            )}
        </div>
        <div ><CamRecorder/></div>
        <video ref={videoRef} height="1090vh" playsInline autoPlay hidden></video>     

        
        </>
    )
}

export default Record;