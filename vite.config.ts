import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: './.vite',
  assetsInclude: ["**/*.mp4"], // 명 // 비디오 파일을 에셋으로 포함
})
// server: {
//   proxy: {
//     "/api": {
//       target: "http://3.38.63.75:8080", // 실제 서버 주소
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ""), // 경로 재작성
//     },
//   },
// },
