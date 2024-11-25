import React from 'react';
import { Button, message } from 'antd';

const Status = ({ onStatusUpdate }) => {
  const getStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_status");
      if (response.ok) {
        const data = await response.json();
        onStatusUpdate(data.status); // 부모 컴포넌트에 상태값 전달
        message.success(`서버 상태: ${data.status}`);
      } else {
        message.error("서버 상태 가져오기 실패");
      }
    } catch (error) {
      message.error(`오류 발생: ${error.message}`);
    }
  };

  return (
    <Button type="primary" onClick={getStatus}>
      서버 상태 가져오기
    </Button>
  );
};

export default Status;
