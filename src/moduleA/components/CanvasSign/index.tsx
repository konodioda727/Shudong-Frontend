import { Canvas, View } from '@tarojs/components'
import Taro, { CanvasContext, useReady } from '@tarojs/taro'
import { FC, forwardRef, useImperativeHandle, useState } from 'react'
import './index.less'
import { CanvasSignProps, ToDataURLResult } from '../types/canvasSignProps'

/**
 * 将 canvas 内容转换成 base64 字符串
 */
const toDataURL = async (
  canvasId: string,
  canvas?: CanvasContext,
): Promise<ToDataURLResult> => {
  if (!canvas) return { errMsg: 'canvas is null', tempFilePath: '' }

  return new Promise((resolve, reject) => {
    canvas.draw(true, () => {
      Taro.canvasToTempFilePath({
        canvasId: canvasId,
        fileType: 'png',
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      })
    })
  })
}

/**
 * 获取 canvas 的尺寸
 */
const getCanvasSize = async (
  canvasId: string,
): Promise<{ height: number; width: number }> => {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery()
    query
      .select('#' + canvasId)
      .boundingClientRect()
      .exec(([size]) => resolve(size))
  })
}

export const CanvasSign: FC<CanvasSignProps> = forwardRef((__, ref) => {
  const [context, _] = useState<Taro.CanvasContext>(
    Taro.createCanvasContext('myCanvas'),
  )
  // 绘制轨迹信息
  const [lineInfo, setLineInfo] = useState({ startX: 0, startY: 0 })

  useReady(() => {
    context.setLineWidth(4)
    context.setStrokeStyle('#000000')
    context.setLineCap('round')
    context.setLineJoin('round')
  })

  function canvasStart(e: any) {
    e.preventDefault()
    console.log(e.touches)
    setLineInfo({ startX: e.touches[0].x, startY: e.touches[0].y })
    context.beginPath()
    console.log('X' + lineInfo.startX)
  }

  function canvasMove(e: any) {
    e.preventDefault()

    let x = e.touches[0].x
    let y = e.touches[0].y
    context.moveTo(lineInfo.startX, lineInfo.startY)
    context.lineTo(x, y)
    context.stroke()
    context.draw(true)
    lineInfo.startX = x
    lineInfo.startY = y
  }

  const clear = () => {
    context.draw()
  }

  const saveAsImage = async () => {
    console.log(context)
    const { tempFilePath } = await toDataURL('myCanvas', context)
    const { width, height } = await getCanvasSize('saveCanvas')

    // 这里完成了签名图片的旋转操作
    const saveCanvas = Taro.createCanvasContext('saveCanvas')
    saveCanvas.translate(0, height)
    saveCanvas.rotate((-90 * Math.PI) / 180)
    saveCanvas.drawImage(tempFilePath, 0, 0, height, width)
    await toDataURL('saveCanvas', saveCanvas)

    return await toDataURL('saveCanvas', saveCanvas)
  }

  useImperativeHandle(ref, () => ({ clear, saveAsImage }))

  return (
    <View className="canvas-container">
      {/* 这个 canvas 用来签名 */}
      <Canvas
        className="canvas-sign"
        canvasId="myCanvas"
        id="myCanvas"
        disableScroll
        onTouchStart={canvasStart}
        onTouchMove={canvasMove}
      ></Canvas>

      {/* 这个 canvas 用于把签名内容旋转九十度 */}
      <Canvas
        className="canvas-rotate"
        canvasId="saveCanvas"
        id="saveCanvas"
      ></Canvas>
    </View>
  )
})
