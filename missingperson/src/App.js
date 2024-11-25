import React, { useState } from 'react';
import { Space } from 'antd';
import Status from './Status';
import Video from './Test_video';

// 디자인
// upload - post 동영상올리기 ㅇ
// get_status - get 진행상태받기 ㅇ
// get_result - get 결과동영상받기 
// upload_image - post 이미지 올리기
// request_process - get 디텍션해달라요청인가
const App = () => {
  const [status, setStatus] = useState(null); // 상태 저장

  return (
    <div style={{ padding: "20px" }}>
      <h1>통신테스트중</h1>
      <Space direction="vertical" size="large">
        {/* 서버 상태 가져오기 버튼 */}
        <Status onStatusUpdate={setStatus} />

        {/* 서버에서 받은 상태 표시 */}
        {status !== null && <p>서버에서 받은 상태: {status}</p>}

        {/* 파일 업로드 */}
        <Video />
      </Space>
    </div>
  );
};

export default App;
