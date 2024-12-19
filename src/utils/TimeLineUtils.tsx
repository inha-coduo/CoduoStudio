// 100px -> 120000
// 10px -> 12000ms
// 1px -> 1200ms
// 1ms -> 1 / 1200px
// 100ms -> 1 / 12px
// 100 index -> 20분
// 10 index -> 100px -> 120000ms -> 120s -> 2분
// 1 index -> 10px -> 12000ms -> 12s -> 12초
// 1ms -> 1 / 12000 index ->

export function pixelToTime(offset: number) {
  return offset * 1200;
}

export function timeToPixel(time: number) {
  return time * (1 / 1200);
}
