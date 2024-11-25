import React, {useEffect, useState} from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toHex from 'uint8-to-hex';


/* upload 구현
POST /
Video.mp4 -> comp(zip) -> hex -> ASCII -> BASE64 -> 서버
*/
const Video = () => {

{/* 비디오 파일 인코딩 */}
  const processFile = async (file) => {

    const fileData = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileData);

    const hexString = toHex(uint8Array);


    // ASCII
    const asciiString = hexString.match(/.{1,2}/g).map((hex) => String.fromCharCode(parseInt(hex, 16))) // 각 HEX를 ASCII 문자로 변환.join("");

    // BASE64
    const base64String = btoa(asciiString);

    return base64String;
  };


  const handleUpload = async (file) => {
    try {
        console.log("1")
      // 파일 처리 및 변환  
      const processedData = await processFile(file);

      // 서버로 데이터 전송
      const payload = {
        filename: file.name,
        video: processedData,
        mpt: "example_mpt_value", // 추가 데이터
      };

      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // JSON 형태로 전송
      });

      if (response.ok) {
        const data = await response.json();
        message.success(`업로드 성공: ${data.message}`);
      } else {
        message.error("업로드 실패");
      }
    } catch (error) {
      message.error(`오류 발생: ${error.message}`);
    }
  };

  return (
    <Upload
      customRequest={({ file }) => handleUpload(file)}
      showUploadList={false} // 업로드 목록 숨김
    >
      <Button icon={<UploadOutlined />}>upload test</Button>
    </Upload>
  );
};

export default Video;
