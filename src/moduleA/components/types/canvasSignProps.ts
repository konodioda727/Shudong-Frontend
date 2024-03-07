import { Ref } from 'react'

export interface CanvasSignContext {
  clear: () => void
  saveAsImage: () => Promise<ToDataURLResult>
}

export interface CanvasSignProps {
  ref?: Ref<CanvasSignContext>
}

export interface ToDataURLResult {
  tempFilePath: string
  errMsg: string
}
