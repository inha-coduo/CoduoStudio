export interface SetType {
  (partial: unknown, replace?: false): void;
  (state: unknown, replace: true): void;
}

export interface Video {
  id: string
  data: File
  title: string
  duration: number
  startTime: number
  endTime: number
}

export interface Code {
  id: string
  data: string
  title: string
  duration: number
  startTime: number
  endTime: number
}
