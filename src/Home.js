import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Đảm bảo đã xuất db từ firebase-config
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "yourCollectionName"));
        const dataList = querySnapshot.docs.map((doc) => doc.data());
        setData(dataList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Trang Chủ</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
