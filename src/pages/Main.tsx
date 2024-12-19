import useZustand from "../Store/store";
import Header from "../components/Header";
import LeftToolArea from "../components/LeftToolArea";
import RightToolArea from "../components/RightToolArea";
import TimeLine from "../components/TimeLine";
import { TitleInputForm } from "../components/TitleInputForm";
import { Loading } from "../components/Loading";

export default function Main() {
  let { isModalOpen, isLoading } = useZustand();

  return (
    <div className="h-screen w-full bg-black p-1 flex flex-col">
      <div className="h-[50px] p-1">
        <Header />
      </div>
      <div className="flex h-[500px] box-border">
        <div className="w-1/2 p-1 h-full">
          <LeftToolArea />
        </div>
        <div className="w-1/2 p-1 h-full">
          <RightToolArea />
        </div>
      </div>
      <div className="flex-grow p-1">
        <TimeLine />
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <TitleInputForm />
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
    </div>
  );
}

// export default function Main() {
//   return (
//     <>
//       <CoduPlayer hashKey="abcd-1234-efgh-5678"></CoduPlayer>
//     </>
//   );
// }

interface CoduPlayerProps {
  hashKey: string;
}
function CoduPlayer({ hashKey }: CoduPlayerProps) {
  return <></>;
}
// var temp = 20;
// var cute = 30;
// console.log(temp + cute);
