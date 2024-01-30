import {  Canvas, View } from "@tarojs/components"
import Taro, { useReady } from "@tarojs/taro";
import {  forwardRef, useImperativeHandle,useState} from "react";
import  "./index.less";

/**
 * 签名组件 ref context
 */
/* export interface CanvasSignContext {
  clear: () => void
  saveAsImage: () => Promise<ToDataURLResult>
} */

/**
* CanvasSign.props 参数类型
*/
/* export interface CanvasSignProps {
  ref?: Ref<CanvasSignContext>
} */

/**
 * canvas 导入图片结果
 */
/*  export interface ToDataURLResult {
  tempFilePath: string
  errMsg: string
}
 */
/**
 * 将 canvas 内容转换成 base64 字符串
 */
const toDataURL = async (canvasId, canvas) => {
  if (!canvas) return { errMsg: 'canvas is null', tempFilePath: '' }

  return new Promise((resolve, reject) => {
    canvas.draw(true, () => {
      Taro.canvasToTempFilePath({
        canvasId: canvasId,
        fileType: 'png',
        success: res => resolve(res),
        fail: err => reject(err)
      });
    });
  })
}

/**
 * 获取 canvas 的尺寸
 */
const getCanvasSize = async (canvasId) => {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery()
    query.select('#' + canvasId)
      .boundingClientRect()
      .exec(([size]) => resolve(size))
  })
}

/**
 * 签名绘图 canvas 组件
 * 
 * @see https://juejin.cn/post/6978721559397531678
 */
export const CanvasSign= forwardRef((props, ref) => {
  // 绘图画布引用
  /* const context = useRef(); */
  const [context,setContext]=useState(null)
  // 绘制轨迹信息
  const [lineInfo,setLineInfo]=useState({startX: 0, startY: 0 })
  //const lineInfo = useRef({ startX: 0, startY: 0 });

    
  useReady(() => {
    const ctx = Taro.createCanvasContext('myCanvas')
   // const { windowWidth, windowHeight } = Taro.getSystemInfoSync()
    ctx.setLineWidth(4)
    ctx.setStrokeStyle("#000000")
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
    /* setTimeout(()=>{
      ctx._context.canvas.width = windowWidth;
      ctx._context.canvas.height = windowHeight;
      ctx._context.strokeStyle='#000000';
      ctx._context.lineWidth=4;
      ctx._context.lineCap='round';
      ctx._context.lineJoin='round';
    },2000) */
    
    console.log(ctx)
    setContext(ctx)
   /*  const query = Taro.createSelectorQuery()
    query.select('#myCanvas')
        .context(res => {
          if (!res.context) return
            console.log(res.context._context)
          const { windowWidth, windowHeight } = Taro.getSystemInfoSync()
            
          res.context._context.canvas.width = windowWidth;
          res.context._context.canvas.height = windowHeight;
  
          res.context._context.strokeStyle='#000000';
          res.context._context.lineWidth=4;
          res.context._context.lineCap='round';
          res.context._context.lineJoin='round';
          context.current = res.context._context as CanvasContext;
        })
        .exec() */
        /* 两种方法都可以拿到canvas */
     /*  .fields({
        node: true,
        size: true
    })
    .exec((res)=>{
        const { node } = res[0]
        console.log(res[0])
        if (!node) return
       
        const cxt = res[0].node.getContext('2d')
        
        const { windowWidth, windowHeight } = Taro.getSystemInfoSync()
        cxt.canvas.width = windowWidth;
        cxt.canvas.height = windowHeight;
        cxt.lineWidth=4;
        cxt.lineCap='round';
        cxt.lineJoin='round';
       
        context.current=cxt
        console.log(cxt) */
  
  })
  /* useEffect(()=>{
    const el=context.current
    console.log(el)
  },[]) */
  function canvasStart (e) {
    e.preventDefault();
    console.log(e.touches)
    setLineInfo({startX: e.touches[0].x, startY:e.touches[0].y })
    //context.current?.beginPath()
    context.beginPath()
   /*  ctx.beginPath() */
    console.log('X'+ lineInfo.startX)
  }

  function canvasMove  (e)  {
    e.preventDefault();

    let x = e.touches[0].x
    let y = e.touches[0].y
    /* console.log('X'+lineInfo.startX+'Y'+lineInfo.startY) */
    context.moveTo(lineInfo.startX, lineInfo.startY)
    /* ctx.moveTo(lineInfo.current.startX, lineInfo.current.startY) */
    context.lineTo(x, y)
    context.stroke()
    context.draw(true)
    lineInfo.startX = x
    lineInfo.startY = y
  }

  const clear = () => {
    context.draw();
  }

  const saveAsImage = async () => {
    console.log(context)
    const { tempFilePath } = await toDataURL('myCanvas', context)
    const { width, height } = await getCanvasSize('saveCanvas')
  
    // 这里完成了签名图片的旋转操作
    const saveCanvas = Taro.createCanvasContext('saveCanvas')
    saveCanvas.translate(0, height)
    saveCanvas.rotate(-90 * Math.PI / 180)
    saveCanvas.drawImage(tempFilePath, 0, 0, height, width)
    const {Imagepath} = await toDataURL('saveCanvas', saveCanvas)
   
    console.log('save'+Imagepath)
    return await toDataURL('saveCanvas', saveCanvas)
  }

  useImperativeHandle(ref, () => ({ clear, saveAsImage }))

  return (
    <View className='container'>
      {/* 这个 canvas 用来签名 */}
      <Canvas
        className='signCanvas'
        canvasId='myCanvas'
        id='myCanvas'
        disableScroll
        onTouchStart={canvasStart}
        onTouchMove={canvasMove}
      ></Canvas>

      {/* 这个 canvas 用于把签名内容旋转九十度 */}
      <Canvas
        className='saveCanvas'
        canvasId='saveCanvas'
        id='saveCanvas'
      ></Canvas>
    </View>
  )
})