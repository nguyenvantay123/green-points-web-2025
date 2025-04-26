// firebase-functions.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from './firebase-config';

export const updatePoints = async (pointsToAdd) => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "users", user.uid);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentPoints = userData.points || 0;
        await setDoc(userRef, {
          points: currentPoints + pointsToAdd
        }, { merge: true });

        alert(`Bạn đã được cộng ${pointsToAdd} điểm!`);
      } else {
        await setDoc(userRef, {
          points: pointsToAdd
        });
        alert(`Bạn đã được cộng ${pointsToAdd} điểm!`);
      }
    } catch (error) {
      console.error("Error updating points: ", error);
      alert("Có lỗi xảy ra khi cập nhật điểm. Vui lòng thử lại.");
    }
  }
};

export const checkForReward = async () => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "users", user.uid);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const points = userData.points || 0;

        if (points >= 50) {
          alert("Chúc mừng! Bạn đã đạt đủ 50 điểm và nhận được quà tặng!");
          await setDoc(userRef, {
            gifts: [...(userData.gifts || []), 'Sổ tay', 'Bình nước']
          }, { merge: true });
        }
      }
    } catch (error) {
      console.error("Error checking for reward: ", error);
      alert("Có lỗi xảy ra khi kiểm tra quà tặng. Vui lòng thử lại.");
    }
  }
};

