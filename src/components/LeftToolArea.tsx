import useZustand from "../Store/store";
import { Code } from "../types/ZustandType";
import { useRef } from "react";
import { CodeEditor } from "./CodeEditor";

export default function LeftToolArea() {
  let {
    toggleModal,
    setTempCode,
    currentCode,
    chaneCompielAnser,
    setCurrentCode,
  } = useZustand();
  let codeRef = useRef<string>("");

  function getCode(code: string) {
    codeRef.current = code;
  }

  return (
    <div className="w-full h-full bg-slate-800 rounded-lg">
      <MenuBar />
      <div className="bg-white h-[1px] opacity-10"></div>
    </div>
  );

  function MenuBar() {
    const btn = (title: string, action: () => Promise<void>) => {
      return (
        <div className="mr-[20px]" onClick={action}>
          <text className="text-gray-300">{title}</text>
        </div>
      );
    };
    return (
      <div className="h-full flex flex-col">
        <div className="h-[40px] flex items-center p-3 justify-between pl-2 pr-2">
          <text className="font-bold text-white pl-3 pr-3">코드 작성하기</text>
          {btn(">", async () => {
            // if (codeRef.current) {
            //   setTempCode(codeRef.current);
            //   toggleModal();
            // }
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            console.log("sadsad");
            if (currentCode?.data && !codeRef.current) {
              codeRef.current = currentCode?.data;
            }

            fetch("http://3.38.63.75:8080/api/compile", {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify({
                language: "JavaScript",
                version: "14",
                project: {
                  entryPoint: "src/main.js",
                  fileInfos: [
                    {
                      name: "main.js",
                      content: codeRef.current,
                      path: "src/main.js",
                    },
                  ],
                },
              }),
              credentials: "include",
            })
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
                interface ApiResponse {
                  isSuccess: boolean;
                  code: string;
                  message: string;
                  result: {
                    exitCode: number;
                    output: string;
                    errorMessage: string | null;
                  };
                }

                // JSON 문자열을 객체로 변환
                const jsonObject: ApiResponse = JSON.parse(result);

                // output 값 추출
                const output: string = jsonObject.result.output;
                let newCode: Code = {
                  id: "",
                  title: "",
                  duration: 0,
                  startTime: 0,
                  endTime: 0,
                  data: codeRef.current,
                };
                setCurrentCode(newCode);
                // const htmlOutput = output.replace(/\n/g, "<br>");

                chaneCompielAnser(output);
              })
              .catch((error) => console.error("Error:", error));
          })}
        </div>
        <div className="flex-grow p-2">
          <CodeEditor getCode={getCode} />
        </div>
      </div>
    );
  }
}
