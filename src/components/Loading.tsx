export function Loading() {
  return (
    <div className="absolute w-screen h-screen">
      <div className="bg-black w-full h-full opacity-50 relative"></div>
      <div className="w-[200px] h-[200px] bg-slate-800 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 w-[50px] h-[50px] rounded-2xl flex flex-col items-center justify-center space-y-4 p-4">
          <div className="animate-spin text-white font-extrabold">CODUO</div>
        </div>
      </div>
    </div>
  );
}
