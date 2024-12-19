const Header = () => {
  const btn = (title: string, action: () => Promise<void>) => {
    return (
      <div className="mr-[20px]" onClick={action}>
        <text className="text-white text-xl">{title}</text>
      </div>
    );
  };

  return (
    <div className="h-full flex items-center justify-between bg-slate-800 rounded-lg">
      <text className="text-white text-2xl font-bold ml-10 mr-10">CODUO</text>
      <div className="flex">
        {btn("설정", async () => {
          // 비동기 작업 수행
          console.log("Action executed");
        })}
        {btn("내보내기", async () => {
          // 비동기 작업 수행
          alert("Hash key: abcd-1234-efgh-5678");
        })}
      </div>
    </div>
  );
};

export default Header;
