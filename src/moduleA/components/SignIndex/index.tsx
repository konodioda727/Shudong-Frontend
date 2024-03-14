import { View, Button, Text, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Component } from 'react'
import styles from './index.less'

interface State {
  ctx: CanvasRenderingContext2D | null
  isSigned: boolean
  backgroundColor: string
  lineColor: string
  lineWidth: number
}

export default class SignIndex extends Component<{}, State> {
  canvasRef = Taro.createRef<HTMLCanvasElement>()

  state: State = {
    ctx: null,
    isSigned: false,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    lineColor: '#000',
    lineWidth: 4,
  }

  componentDidMount() {
    this.init()
  }

  config = {
    navigationBarTitleText: '签名',
    pageOrientation: 'landscape',
  }

  init = () => {
    this.canvasRef.current!.fields({ node: true, size: true }).exec(([res]) => {
      const canvas = res.node
      const ctx = canvas.getContext('2d')!
      const dpr = Taro.getSystemInfoSync().pixelRatio
      canvas.width = res.width * dpr
      canvas.height = res.height * dpr
      ctx.scale(dpr, dpr)
      const { lineColor, lineWidth, backgroundColor } = this.state
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 1
      ctx.shadowColor = lineColor
      this.setState({ ctx })
    })
  }

  start = (e: Taro.TouchEvent) => {
    const { ctx } = this.state
    if (e.type !== 'touchstart' || !ctx) return
    const { x, y } = e.changedTouches[0]
    ctx!.moveTo(x, y)
    ctx!.beginPath()
  }

  move = (e: Taro.TouchEvent) => {
    const { ctx, isSigned } = this.state
    if (e.type !== 'touchmove' || !ctx) return
    if (!isSigned) {
      this.setState({ isSigned: true })
    }
    const { x, y } = e.changedTouches[0]
    ctx!.lineTo(x, y)
    ctx!.stroke()
    e.preventDefault()
  }

  end = (e: Taro.TouchEvent) => {
    const { ctx } = this.state
    if (e.type !== 'touchend' || !ctx) return
    ctx!.closePath()
  }

  save = () => {
    const { ctx, isSigned } = this.state
    if (!ctx) return
    if (!isSigned) {
      Taro.showToast({
        title: '请先手写签名',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    const base64 = ctx!.canvas.toDataURL()
    console.log(base64)
  }

  clear = () => {
    const { ctx, backgroundColor } = this.state
    if (!ctx) return
    const { width, height } = ctx.canvas
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    this.setState({ isSigned: false })
  }

  render() {
    return (
      <View className={styles.page}>
        <Canvas
          ref={this.canvasRef}
          className={styles.canvas}
          type="2d"
          disable-scroll
          onTouchStart={this.start}
          onTouchMove={this.move}
          onTouchEnd={this.end}
        />
        <View className={styles.btns}>
          <Text className={styles.tip}>请在上方空白区域手写签名</Text>
          <View className={styles['btns-wrap']}>
            <Button
              className={[styles.btn, styles.primary]}
              hoverClass={styles.hover}
              hoverStayTime={100}
              onClick={this.save}
            >
              确认
            </Button>
            <Button
              className={[styles.btn, styles.secondary]}
              hoverClass={styles.hover}
              hoverStayTime={100}
              onClick={this.clear}
            >
              重写
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
