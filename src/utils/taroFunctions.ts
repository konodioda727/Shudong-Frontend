import Taro from '@tarojs/taro'

export function Clip(data: any, text?: string, duration?: number) {
  //复制微博地址
  Taro.setClipboardData({
    data: data,
    success: function () {
      Taro.getClipboardData({
        success: function () {
          Taro.showToast({
            title: text || '复制成功',
            icon: 'none',
            duration: duration || 1500,
          })
        },
      })
    },
  })
}

export const Nav = (url: string) => {
  Taro.navigateTo({ url: url })
}
