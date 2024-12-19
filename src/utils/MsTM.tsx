export function MsTM(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const displayMinute = Math.floor(totalSeconds / 60);
  const displaySecond = totalSeconds % 60;

  // 두 자리 형식으로 포맷팅
  const formattedMinute =
    displayMinute < 10 ? "0" + displayMinute : String(displayMinute);
  const formattedSecond =
    displaySecond < 10 ? "0" + displaySecond : String(displaySecond);

  return `${formattedMinute}:${formattedSecond}`;
}
