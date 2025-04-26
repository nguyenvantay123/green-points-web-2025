import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Map from "./Map";
import Camera from "./Camera";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import TaskDescription from "./TaskDescription"; // Import TaskDescription component
import Tesseract from "tesseract.js";  // Import Tesseract.js for image recognition

const App = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [showFirework, setShowFirework] = useState(false);
  const [width, height] = useWindowSize();
  const [playMusic, setPlayMusic] = useState(false);
  const [scannedText, setScannedText] = useState(""); // Store scanned text from image
  const [isImageVerified, setIsImageVerified] = useState(false); // Store image verification status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (points >= 50) {
      setShowFirework(true);
      setPlayMusic(true);
      setTimeout(() => {
        setShowFirework(false);
      }, 3000);
    }
  }, [points]);

  const increasePoints = () => {
    if (images.length === 3 && video) {
      if (isImageVerified) {
        setPoints(points + 5);
      } else {
        alert("Hình ảnh chưa được xác minh. Vui lòng tải lại ảnh hoặc video.");
      }
    } else {
      alert("Vui lòng chụp đủ 3 bức ảnh và 1 video trước khi hoàn thành tác vụ.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Đăng xuất thành công");
  };

  const handleCapture = (capturedImage) => {
    if (images.length < 3) {
      setImages([...images, capturedImage]);
      verifyImage(capturedImage); // Verify image when captured
    }
  };

  const handleVideoCapture = (capturedVideo) => {
    setVideo(capturedVideo);
  };

  const verifyImage = (image) => {
    Tesseract.recognize(
      image,
      "eng",
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setScannedText(text);
      // Check if the scanned text contains relevant information to confirm the image is related to cleanup
      if (text.toLowerCase().includes("rác") || text.toLowerCase().includes("dọn dẹp")) {
        setIsImageVerified(true);
      } else {
        setIsImageVerified(false);
        alert("Hình ảnh không phù hợp. Vui lòng tải lại ảnh dọn rác.");
      }
    });
  };

  return (
    <div className="App">
      {/* 🔥 Pháo hoa + Hoa giấy */}
      {showFirework && <div className="firework"></div>}
      {points >= 50 && <Confetti width={width} height={height} />}

      {/* 🔥 Nhạc chiến thắng */}
      {playMusic && (
        <audio autoPlay onEnded={() => setPlayMusic(false)}>
          <source src="/victory.mp3" type="audio/mpeg" />
        </audio>
      )}

      <div className="header">
        <img src="/logo.png" alt="Green Points Logo" className="logo" />
        <p className="slogan">Cùng nhau xây dựng môi trường xanh – sạch – đẹp</p>
      </div>

      <div className="container">
        {!user ? (
          <div>
            <h1>Chào mừng bạn đã đến với Green Points</h1>
            <Register />
            <Login />
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#a8e6a3",
              borderRadius: "20px",
              padding: "20px",
              marginTop: "20px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            <h2>Xin chào: {user.email}</h2>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Điểm hiện tại: {points}
            </p>
            <div style={{ marginTop: "20px" }}>
              <h3>Phần thưởng</h3>
              {points >= 50 ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  🎉 Bạn đã đủ điểm để đổi quà!<br />
                  📞 Liên hệ Admin để nhận quà: <br />
                  Facebook:{" "}
                  <a
                    href="https://www.facebook.com/profile.php?id=100024791807599"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nguyễn Tây
                  </a>
                  <br />
                  Zalo: 0795521622
                </p>
              ) : (
                <p>Cần {50 - points} điểm nữa để đổi quà 🎁</p>
              )}
            </div>
            <button onClick={handleLogout} style={{ marginTop: "10px" }}>
              Đăng xuất
            </button>
            <div style={{ marginTop: "20px" }}>
              <h3>Ảnh đã chụp:</h3>
              {images.length > 0 ? (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Captured ${index + 1}`}
                    style={{ width: "100px", margin: "5px", borderRadius: "8px" }}
                  />
                ))
              ) : (
                <p>Chưa có ảnh nào.</p>
              )}
            </div>
            {video && (
              <div style={{ marginTop: "10px" }}>
                <h3>Video đã quay:</h3>
                <video
                  src={video}
                  controls
                  style={{ width: "250px", borderRadius: "10px" }}
                />
              </div>
            )}
            <div style={{ marginTop: "20px" }}>
              <Map />
              <Camera onCapture={handleCapture} onVideoCapture={handleVideoCapture} />
            </div>
            {/* Thêm phần mô tả tác vụ vào đây */}
            <TaskDescription />
            <button
              onClick={increasePoints}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Hoàn thành tác vụ và kiếm 5 điểm
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <a
          href="https://www.facebook.com/profile.php?id=100024791807599"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Nhận quà qua đây - Facebook: Nguyễn Tây
        </a>
        <span>|</span>
        <a
          href="tel:0795521622"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Nhận quà qua đây - Zalo: 0795521622
        </a>
      </div>
    </div>
  );
};

export default App;
