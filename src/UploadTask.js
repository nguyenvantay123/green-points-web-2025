import { storage } from '../firebase';  // Import storage
import { ref, uploadBytes } from 'firebase/storage';

const uploadFile = async (file) => {
  // Tạo tham chiếu đến vị trí tệp trong Firebase Storage
  const fileRef = ref(storage, `images/${file.name}`);

  try {
    // Tải tệp lên Firebase Storage
    await uploadBytes(fileRef, file);
    alert('Tải tệp lên thành công!');
  } catch (error) {
    console.error('Lỗi tải tệp lên:', error);
    alert('Có lỗi xảy ra khi tải tệp lên.');
  }
};

