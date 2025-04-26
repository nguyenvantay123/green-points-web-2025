import React from "react";
import Webcam from "react-webcam";

const Camera = ({ onCapture }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [onCapture]); // Thêm onCapture vào mảng phụ thuộc

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <button onClick={capture}>Chụp ảnh</button>
    </div>
  );
};

export default Camera;
