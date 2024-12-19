import React, { useRef, useState, useEffect } from "react";
import useZustand from "../Store/store";
import { Video, Code } from "../types/ZustandType";
import sampleVideo from "../assets/videoplayback.mp4";

export default function RightToolArea() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(sampleVideo);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0); // 현재 재생 시간
  const intervalRef = useRef<number | null>(null);

  let {
    toggleModal,
    setTempVideo,
    toggleIsLoading,
    currentVideo,
    chageCurrentTime,
    setCurrentCode,
  } = useZustand();

  const handleTextClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "video/mp4") {
        const url = URL.createObjectURL(file);
        setVideoFile(file);
        setVideoURL(url);
      } else {
        alert("Only MP4 files are allowed.");
      }
    }
  };

  // 재생 시 실행할 함수
  const handlePlay = () => {
    console.log("비디오 재생 시작!");
    if (videoRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      }, 1000); // 매 초마다 시간 업데이트
    }
  };

  // 일시정지 시 실행할 함수
  const handlePause = () => {
    console.log("비디오 재생 일시정지!");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    console.log(`현재 비디오 시간: ${currentTime} 초`);
    chageCurrentTime(currentTime * 1000);
    if (currentTime * 1000 > 4000) {
      let tempCode: Code = {
        id: "",
        title: "",
        data: 'for(let i = 0; i < 10; i = i + 1){\n    let star = "";\n    for(let j = 0; j < i; j = j+1) {\n        star = star + "*";\n    }\n    console.log(star)\n}',
        startTime: 0,
        endTime: 0,
        duration: 0,
      };
      setCurrentCode(tempCode);
    } else {
      let tempCode: Code = {
        id: "",
        title: "",
        data: "var a = 10;\nvar b = 20;\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);\nconsole.log(a % b);",
        startTime: 0,
        endTime: 0,
        duration: 0,
      };
      setCurrentCode(tempCode);
    }
  }, [currentTime]);

  return (
    <div className="w-full h-full bg-slate-800 rounded-lg pl-2 pr-2">
      <div className="h-[40px] flex items-center p-3 justify-between">
        <div className="mr-[20px]">
          <text className="text-white font-bold">홈</text>
        </div>
        <div className="flex">
          <div className="mr-[20px]" onClick={handleTextClick}>
            {/* <text className="text-gray-300">파일 불러오기</text> */}
          </div>
          <input
            type="file"
            accept="video/mp4"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="bg-white h-[1px] opacity-10"></div>
      {videoURL ? (
        <div className="flex items-center justify-center h-[calc(100%-41px)]">
          <video
            ref={videoRef}
            src={videoURL}
            controls
            className="max-w-[80%] max-h-[80%] border rounded"
            onPlay={handlePlay} // 재생 이벤트 핸들러
            onPause={handlePause} // 일시정지 이벤트 핸들러
          />
        </div>
      ) : (
        <div className="w-full h-4/5 flex items-center justify-center">
          <div className="bg-black w-4/5 h-4/5"></div>
        </div>
      )}
    </div>
  );
}
