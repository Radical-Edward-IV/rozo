/**
 * 이미지 로테이션 composable
 * 지정된 이미지 목록을 각각의 duration에 맞춰 순환
 */
import { ref, onMounted, onUnmounted } from 'vue'

export interface ImageRotationOptions {
  images: readonly string[]
  durations: readonly number[]
}

export function useImageRotation(options: ImageRotationOptions) {
  const { images, durations } = options

  const currentIndex = ref(0)
  const currentImage = ref(images[0])
  let timer: ReturnType<typeof setTimeout> | null = null

  const rotate = () => {
    timer = setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length
      currentImage.value = images[currentIndex.value]!
      rotate()
    }, durations[currentIndex.value])
  }

  onMounted(rotate)

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { currentImage, currentIndex }
}
