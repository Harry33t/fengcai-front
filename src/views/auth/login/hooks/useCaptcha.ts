/**
 * 验证码相关逻辑
 */
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export function useCaptcha() {
  const captchaImageUrl = ref('')
  const captchaImageID = ref('')

  // 延时辅助函数
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // 生成随机验证码文本
  const generateRandomText = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // 生成验证码图片（Canvas 方式）
  const generateCaptchaImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = 120
    canvas.height = 40

    // 背景
    ctx.fillStyle = '#f0f2f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 随机背景线条
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }

    // 验证码文字
    const text = generateRandomText()
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    for (let i = 0; i < text.length; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 0.8)`
      const x = 20 + i * 25
      const y = 20 + (Math.random() - 0.5) * 6
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((Math.random() - 0.5) * 0.3)
      ctx.fillText(text[i], 0, 0)
      ctx.restore()
    }

    // 随机噪点
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1)
    }

    return canvas.toDataURL('image/png')
  }

  // 生成验证码图片 URL
  const generateCaptchaUrl = () => {
    const timestamp = Date.now()
    captchaImageID.value = `captcha-${timestamp}`
    captchaImageUrl.value = generateCaptchaImage()
    return captchaImageUrl.value
  }

  // 刷新验证码
  const refreshCaptcha = async () => {
    try {
      await delay(300)
      generateCaptchaUrl()
      console.log('刷新验证码:', captchaImageID.value)
    } catch (error) {
      console.error('Error refreshing captcha:', error)
      ElMessage.error('验证码获取失败')
    }
  }

  // 初始化验证码
  const initCaptcha = () => {
    generateCaptchaUrl()
  }

  return {
    captchaImageUrl,
    captchaImageID,
    refreshCaptcha,
    initCaptcha
  }
}
