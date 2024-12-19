import React, { useState } from "react";
import { Code, Video } from "../types/ZustandType";
import useZustand from "../Store/store";

export function TitleInputForm() {
  const [title, setTitle] = useState("");
  let {
    toggleModal,
    tempCode,
    tempVideo,
    controlCodes,
    controlVideos,
    clearTempCode,
    clearTempVideo,
  } = useZustand();

  function onSubmit() {
    if (tempCode != null) {
      controlCodes((codes) => {
        const newCode: Code = {
          id: crypto.randomUUID(),
          title: title,
          data: tempCode,
          duration: 360000,
          startTime: 0,
          endTime: 0,
        };
        codes.push(newCode);
        return codes;
      });
    } else if (tempVideo != null) {
      controlVideos((videos) => {
        const newVideo: Video = tempVideo;
        newVideo.title = title;
        videos.push(newVideo);
        return videos;
      });
    }
    clearTempVideo();
    clearTempCode();
    toggleModal();
  }

  return (
    <div className="absolute w-screen h-screen">
      <div className="bg-black w-full h-full opacity-50 relative"></div>
      <div className="w-[400px] h-[200px] bg-slate-800 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 w-[400px] h-[200px] rounded-2xl flex flex-col items-center justify-center space-y-4 p-4">
          {/* 제목 */}
          <h2 className="text-white text-xl font-bold">이름을 입력하세요</h2>

          {/* 입력 필드 */}
          <input
            type="text"
            placeholder="이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 확인 버튼 */}
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
