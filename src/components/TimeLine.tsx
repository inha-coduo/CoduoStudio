import React, { useRef, useEffect, useState } from "react";
import useZustand from "../Store/store";
import { Code, Video } from "../types/ZustandType";
import { MsTM } from "../utils/MsTM";

export default function TimeLine() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    totalTime,
    currentTime,
    videos,
    codes,
    currentCode,
    currentVideo,
    setCurrentCode,
    setCurrentVideo,
    clearAllCurrentData,
    changeCodeDuration,
    compileAnswer,
  } = useZustand();
  const preveScrollLeftRef = useRef<number>(0);
  const [xOffset, setXOffset] = useState(0);
  const xOffsetRef = useRef<number>(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const initialOffset = useRef(0);
  let playIntervalIdRef = useRef<number | undefined>(undefined);
  const currentDurationRef = useRef<number>();

  // useEffect(() => {
  //   // 상태 변화 감지

  //   // 언마운트 시 구독 해제
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    dragging.current = true;
    dragStartX.current = event.clientX;
    initialOffset.current = xOffset;
  };

  function setXOffsetWithChangingTime(number) {
    const store = useZustand.getState();
    store.currentTime = number + preveScrollLeftRef.current;
    if (store.currentTime < 0) {
      store.currentTime = 0;
    }

    useZustand.setState({ currentTime: store.currentTime * 1200 });
    setXOffset(number);
  }

  function setXOffsetWithChangingTimeWithFunction(
    func: (previoudOffset: number) => number
  ) {
    const newXoffset = func(xOffsetRef.current);
    const store = useZustand.getState();
    store.currentTime = newXoffset + preveScrollLeftRef.current;
    if (store.currentTime < 0) {
      store.currentTime = 0;
    }
    useZustand.setState({ currentTime: store.currentTime * 1200 });
    setXOffset(newXoffset);
  }

  function play() {
    clearInterval(playIntervalIdRef.current);
    playIntervalIdRef.current = setInterval(() => {
      setXOffsetWithChangingTimeWithFunction((prevOffset) => {
        let newOffset = prevOffset + 1;

        if (prevOffset + 1 >= 600) {
          newOffset = 600;
          if (containerRef.current) {
            containerRef.current.scrollBy({
              top: 0,
              left: 200, // 1초에 1000px씩 이동
              behavior: "instant",
            });
          }
        }
        xOffsetRef.current = newOffset;
        return newOffset;
      });
    }, 1);
  }

  function pause() {
    clearInterval(playIntervalIdRef.current);
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging.current) {
      const deltaX = event.clientX - dragStartX.current;
      xOffsetRef.current = initialOffset.current + deltaX;
      const newXoffset = initialOffset.current + deltaX;
      const store = useZustand.getState();
      store.currentTime = newXoffset + preveScrollLeftRef.current;
      if (store.currentTime < 0) {
        store.currentTime = 0;
      }
      useZustand.setState({ currentTime: store.currentTime * 1200 });
      setXOffsetWithChangingTime(initialOffset.current + deltaX);
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      dragging.current = false;
    };

    // Add mouseup event listener to handle when dragging stops outside the element
    window.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const offsetChange = preveScrollLeftRef.current - scrollLeft;
      xOffsetRef.current += offsetChange;
      setXOffsetWithChangingTime(xOffsetRef.current);
      preveScrollLeftRef.current = scrollLeft;
    }
  };
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    // Clean up on unmount
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (containerRef.current) {
  //       const currentScrollLeft = containerRef.current.scrollLeft;
  //       const maxScrollLeft =
  //         containerRef.current.scrollWidth - containerRef.current.clientWidth;

  //       if (currentScrollLeft < maxScrollLeft) {
  //         setXOffset((prevOffset) => {
  //           let newOffset = prevOffset - 1;
  //           if (containerRef.current) {
  //             containerRef.current.scrollBy({
  //               top: 0,
  //               left: 1, // 1초에 100px씩 이동
  //               behavior: "instant",
  //             });
  //           }
  //           return newOffset;
  //         });
  //       } else {
  //         clearInterval(interval); // 스크롤이 끝에 도달하면 멈춤
  //       }
  //     }
  //   }, 1); // 1ms
  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  // }, []);
  <div className="flex w-full h-full">
    <div className="flex flex-col">
      <div className="w-full h-[50px]"></div>
      <div className="h-12"></div>
      <div className="w-20 h-1/2 p-4 text-white font-bold flex justify-center items-center">
        <span>영상</span>
      </div>
      <div className="w-20 h-1/2 p-4 text-white font-bold flex justify-center items-center">
        <span>코드</span>
      </div>
    </div>
    {/* 우측 가로 스크롤 영역 */}
    <div className="flex-1 no-scrollbar h-full relative overflow-hidden x-10 flex flex-col">
      {/* 세로 스크롤을 막기 위해 높이를 조정 */}
      <Toolbar />
      <div
        ref={containerRef}
        className="grow overflow-x-scroll overflow-y-hidden whitespace-nowrap flex flex-col"
        onClick={clearAllCurrentData}
      >
        <div
          className="absolute h-full z-10"
          style={{ left: `${xOffset}px` }}
          onMouseDown={handleMouseDown}
        >
          <div className="bg-blue-500 w-[10px] h-4 z-0 transform -translate-x-1/2"></div>
          <div className="bg-blue-500 w-[3px] h-full z-0 transform -translate-x-1/2"></div>
        </div>
        <TimeBar />
        <div className="h-full">
          <div className="h-1/2 items-center">
            {videos.map((video) => (
              <VideoLineBox video={video} />
            ))}
          </div>
          <div className="h-1/2 items-center">
            {codes.map((code) => (
              <CodeLineBox code={code} />
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* 끝 */}
  </div>;
  return (
    <div
      className="w-full h-full bg-slate-800 rounded-lg pl-2 pr-2 flex flex-col p-2"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="text-white bg-black h-full w-full rounded-lg p-3">
        <div style={{ whiteSpace: "pre-line" }}>
          {compileAnswer + "program terminate"}
        </div>
      </div>
    </div>
  );

  function Toolbar() {
    return (
      <div className="w-full h-[50px] flex space-x-3 items-center justify-center">
        <div
          className="play-button w-[30px] h-[30px] bg-green-500 flex items-center justify-center rounded-md shadow-md hover:scale-110 transition-transform cursor-pointer"
          onClick={play}
        ></div>
        <div
          className="pause-button w-[30px] h-[30px] bg-red-500 flex items-center justify-between rounded-md shadow-md hover:scale-110 transition-transform cursor-pointer"
          onClick={pause}
        ></div>

        <p className="text-white text-[20px] font-bold">
          {MsTM(currentTime)} / {MsTM(totalTime)}
        </p>
        <input
          type="text"
          placeholder="숫자 입력"
          value={currentCode?.duration}
          onChange={(e) => {
            const value = e.target.value;
            console.log(value);
            if (currentCode != null) {
              console.log("asdasdas");
              let newCode = currentCode;
              newCode.duration = parseInt(value, 10);
              changeCodeDuration(newCode);
            }
          }}
          className="w-[300px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }

  function TimeBar() {
    // 100px -> 120000
    // 10px -> 12000ms
    // 1px -> 1200ms
    // 1ms -> 1 / 1200px
    // 100ms -> 1 / 12px
    // 100 index -> 20분
    // 10 index -> 100px -> 120000ms -> 120s -> 2분
    // 1 index -> 10px -> 12000ms -> 12s -> 12초
    // 1ms -> 1 / 12000 index ->
    return (
      <div className="w-full h-12 bg-gray-800">
        {/* 눈금 영역 */}
        <div className="w-full h-full flex">
          {[...Array(Math.ceil(totalTime / 12000))].map((_, index) => (
            <div>
              <div
                key={index}
                className="relative border-l border-gray-500"
                style={{
                  width: "10px", // 각 눈금 간격
                  height: index % 10 === 0 ? "60%" : "30%",
                }}
              ></div>
              <div
                className="bottom-0 text-white text-xs translate-x-[-50%]"
                style={{ width: "10px" }}
              >
                {index % 10 === 0 && index !== 0 ? index * 12 : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  type CodeLineBoxProps = {
    code: Code;
  };

  type VideoLineBoxProps = {
    video: Video;
  };

  function CodeLineBox({ code }: CodeLineBoxProps) {
    const width = code.duration * (1 / 1200);

    return (
      <div
        className="inline-block h-20 bg-blue-500 text-white rounded-2xl"
        style={{
          width: `${width}px`,
          border: code.id === currentCode?.id ? "2px solid white" : "",
        }}
        onClick={(e) => {
          e.stopPropagation(); // 상위로 이벤트 전파를 막음
          setCurrentCode(code);
        }}
      >
        <div className="flex items-center justify-center h-full w-full">
          <p>{code.title}</p>
        </div>
      </div>
    );
  }

  function VideoLineBox({ video }: VideoLineBoxProps) {
    const width = video.duration * (1 / 1200);

    return (
      <div
        className="inline-block h-20 bg-blue-500 text-white rounded-2xl"
        style={{
          width: `${width}px`,
          border: video.id === currentVideo?.id ? "2px solid white" : "",
        }}
        onClick={(e) => {
          e.stopPropagation(); // 상위로 이벤트 전파를 막음
          setCurrentVideo(video);
        }}
      >
        <div className="flex items-center justify-center h-full w-full">
          <p>{video.title}</p>
        </div>
      </div>
    );
  }
}

// useEffect(() => {
//   // 0.1초마다 xOffset 증가
//   const interval = setInterval(() => {
//     setXOffset((prevOffset) => {
//       let newOffset = prevOffset + 1;
//       if (prevOffset + 1 >= 600) {
//         newOffset = 400;
//         if (containerRef.current) {
//           containerRef.current.scrollBy({
//             top: 0,
//             left: 200, // 1초에 100px씩 이동
//             behavior: "instant",
//           });
//         }
//       }
//       return newOffset;
//     });
//   }, 1);
//   // 컴포넌트가 언마운트될 때 인터벌 정리
//   return () => clearInterval(interval);
// }, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     if (containerRef.current) {
//       const currentScrollLeft = containerRef.current.scrollLeft;
//       const maxScrollLeft =
//         containerRef.current.scrollWidth - containerRef.current.clientWidth;

//       if (currentScrollLeft < maxScrollLeft) {
//         setXOffset((prevOffset) => {
//           let newOffset = prevOffset - 1;
//           if (containerRef.current) {
//             containerRef.current.scrollBy({
//               top: 0,
//               left: 1, // 1초에 100px씩 이동
//               behavior: "instant",
//             });
//           }
//           return newOffset;
//         });
//       } else {
//         clearInterval(interval); // 스크롤이 끝에 도달하면 멈춤
//       }
//     }
//   }, 1); // 1ms
//   return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
// }, []);

// 100px -> 120000
// 10px -> 12000ms
// 1px -> 1200ms
// 1ms -> 1 / 1200px
// 100ms -> 1 / 12px
// 100 index -> 20분
// 10 index -> 100px -> 120000ms -> 120s -> 2분
// 1 index -> 10px -> 12000ms -> 12s -> 12초
// 1ms -> 1 / 12000 index ->
