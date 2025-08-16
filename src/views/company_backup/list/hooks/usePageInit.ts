import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface PageInitOptions {
  pageTitle: string
}

export function usePageInit(options: PageInitOptions) {
  const router = useRouter()
  
  const currentPageTitle = ref(options.pageTitle)
  const currentTime = ref('')

  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const goBack = () => {
    router.back()
  }

  onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
  })

  return {
    currentPageTitle,
    currentTime,
    goBack
  }
}
