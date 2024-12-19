import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import blackboardTheme from "monaco-themes/themes/Blackboard.json";
import { editor } from "monaco-editor";
import useZustand from "../Store/store";

interface CodeEditorProps {
  getCode: (code: string) => void;
}

export function CodeEditor({ getCode }: CodeEditorProps) {
  const monaco = useMonaco();
  const { currentCode } = useZustand();
  const [code, setCode] = useState(currentCode?.data || "");

  // 테마 설정은 단 1회만 실행되도록 처리
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme(
        "blackboard",
        blackboardTheme as editor.IStandaloneThemeData
      );
      monaco.editor.setTheme("blackboard");
    }
  }, [monaco]);

  // 불필요한 재생성 방지
  const handleEditorChange = useCallback(
    (value?: string) => {
      setCode(value || "");
      if (value != null) {
        getCode(value);
      }
    },
    [getCode]
  );

  // 옵션 객체 메모이제이션
  const editorOptions = useMemo(
    () => ({
      fontSize: 15,
      minimap: { enabled: true },
      scrollbar: {
        vertical: "auto" as const, // 문자열 리터럴 타입으로 고정
        horizontal: "auto" as const,
      },
    }),
    []
  );
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="javascript"
      onChange={handleEditorChange}
      value={code} // 상태에서 관리된 코드 값 사용
      options={editorOptions}
      wrapperProps={{
        className: "rounded-lg overflow-hidden",
      }}
    />
  );
}
