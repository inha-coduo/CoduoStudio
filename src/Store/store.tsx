import { create } from "zustand";
import { Video, Code } from "../types/ZustandType";

interface ZustandState {
  currentTime: number;
  totalTime: number;
  isModalOpen: boolean;
  isLoading: boolean;
  currentVideo: Video | null;
  currentCode: Code | null;
  tempVideo: Video | null;
  tempCode: string | null;
  changeCodeDuration: (code: Code) => void;
  clearTempVideo: () => void;
  clearTempCode: () => void;
  clearAllCurrentData: () => void;
  chageCurrentTime: (ms: number) => void;
  setTempCode: (code: string) => void;
  setTempVideo: (video: Video) => void;
  setCurrentCode: (code: Code) => void;
  setCurrentVideo: (video: Video) => void;
  videos: Video[];
  codes: Code[];
  controlVideos: (action: (vides: Video[]) => Video[]) => void;
  controlCodes: (action: (codes: Code[]) => Code[]) => void;
  toggleModal: () => void;
  toggleIsLoading: () => void;
  increaseCurrentTime: (amount: number) => void;
  compileAnswer: string;
  chaneCompielAnser: (code: string) => void;
}

const useZustand = create<ZustandState>((set) => ({
  currentTime: 0,
  totalTime: 3600000,
  isModalOpen: false,
  videos: [],
  codes: [],
  isLoading: false,
  tempVideo: null,
  tempCode: null,
  currentVideo: null,
  currentCode: null,
  compileAnswer: "",
  chaneCompielAnser: (code: string) => {
    set((state) => {
      return { ...state, compileAnswer: code };
    });
  },
  changeCodeDuration: (code: Code) => {
    set((state) => {
      let temp = state.codes.map((arrCode) => {
        if (code.id === arrCode.id) {
          return code;
        }
        return arrCode;
      });
      return { ...state, codes: temp };
    });
  },
  clearAllCurrentData: () => {
    set((state) => {
      return { ...state, currentCode: null, currentVideo: null };
    });
  },
  setCurrentCode: (code: Code) => {
    set((state) => {
      return { ...state, currentCode: code };
    });
  },
  setCurrentVideo: (video: Video) => {
    set((state) => {
      return { ...state, currentVideo: video };
    });
  },
  chageCurrentTime: (ms: number) => {
    set((state) => {
      return { ...state, currentTime: ms };
    });
  },
  toggleIsLoading: () => {
    set((state) => {
      return { ...state, isLoading: !state.isLoading };
    });
  },
  setTempCode: (code: string) => {
    set((state) => {
      return { ...state, tempCode: code };
    });
  },
  setTempVideo: (video: Video) => {
    set((state) => {
      return { ...state, tempVideo: video };
    });
  },
  clearTempVideo: () => {
    set((state) => {
      return { ...state, tempVideo: null };
    });
  },
  clearTempCode: () => {
    set((state) => {
      return { ...state, tempCode: null };
    });
  },
  controlVideos: (action) => {
    set((state) => {
      return { ...state, videos: action(state.videos) };
    });
  },
  controlCodes: (action) => {
    set((state) => {
      return { ...state, codes: action(state.codes) };
    });
  },
  toggleModal: () => {
    set((state) => {
      return { ...state, isModalOpen: !state.isModalOpen };
    });
  },
  increaseCurrentTime: (amount: number) =>
    set((state) => {
      return { ...state, currentTime: state.currentTime + amount };
    }),
}));

export default useZustand;
