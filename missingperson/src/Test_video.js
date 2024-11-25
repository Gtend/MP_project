import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import toHex from 'uint8-to-hex';

const Video = () => {
  const [results, setResults] = useState({
    unicode: "",
    hex: "",
    ascii: "",
    base64: "",
    decoded: "",
  }); // 변환 결과 상태

  const processFile = async (file) => {
    // 파일을 ArrayBuffer로 읽기
    const fileData = await file.arrayBuffer();
    console.log(fileData)

    const uint8Array = new Uint8Array(fileData);

    // console.log(uint8Array)

    // // 1. 유니코드 변환
    // const unicodeString = Array.from(uint8Array)
    //   .map((byte) => String.fromCharCode(byte))
    //   .join("");

    // let hex = parseInt(unicodeString, 2).toString(16);

    // 2. HEX 변환
    // const hexString = Array.from(uint8Array)
    //   .map((byte) => byte.toString(16).padStart(2, "0"))
    //   .join("");


    const hexString = toHex(uint8Array);

    // 3. ASCII 변환
    const asciiString = hexString
      .match(/.{1,2}/g) // HEX 문자열을 2자리씩 나눔
      .map((hex) => String.fromCharCode(parseInt(hex, 16))) // 각 HEX를 ASCII 문자로 변환
      .join("");

    // 4. Base64 변환
    const base64String = btoa(asciiString);

    // 5. Base64 디코딩
    const decodedString = atob(base64String);

    // 결과 상태 업데이트
    setResults({
      unicode: uint8Array.slice(0, 100), // 일부만 표시 (성능 고려)
      hex: hexString.slice(0, 100),
      ascii: asciiString.slice(0, 100),
      base64: base64String.slice(0, 100),
      decoded: decodedString.slice(0, 100),
    });
  };

  const handleUpload = async (file) => {
    try {
      // 파일 처리 및 결과 표시
      const processedData = await processFile(file);

      message.success("파일 변환 성공!");

      const payload = {
        filename: file.name,
        data: processedData,
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
    <div style={{ padding: "20px" }}>
      <Upload
        customRequest={({ file }) => handleUpload(file)}
        showUploadList={false} // 업로드 목록 숨김
      >
        <Button icon={<UploadOutlined />}>upload test</Button>
      </Upload>

      <div style={{ marginTop: "20px" }}>
        <h3>변환 결과:</h3>

        <div>
          <strong>유니코드:</strong>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              marginTop: "10px",
              wordBreak: "break-word",
            }}
          >
            {results.unicode || "결과 없음"}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <strong>HEX:</strong>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              marginTop: "10px",
              wordBreak: "break-word",
            }}
          >
            {results.hex || "결과 없음"}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <strong>ASCII:</strong>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              marginTop: "10px",
              wordBreak: "break-word",
            }}
          >
            {results.ascii || "결과 없음"}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <strong>Base64:</strong>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              marginTop: "10px",
              wordBreak: "break-word",
            }}
          >
            {results.base64 || "결과 없음"}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <strong>Base64 디코딩:</strong>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              marginTop: "10px",
              wordBreak: "break-word",
            }}
          >
            {results.decoded || "결과 없음"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
