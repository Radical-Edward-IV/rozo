/**
 * 스크롤 위치에 따른 진행도(0~1)를 계산하는 composable
 *
 * @example
 * // 요소가 화면 중간(0.5)에 도달하면 시작, 상단(0)에 도달하면 완료
 * const { elementRef, progress } = useScrollProgress({ start: 0.5, end: 0 })
 *
 * // 요소가 화면 상단에 닿으면 시작, 위로 50% 지나가면 완료
 * const { elementRef, progress } = useScrollProgress({ start: 0, end: -0.5 })
 */
import { ref, onMounted, onUnmounted, nextTick, toValue, type Ref, type MaybeRefOrGetter } from 'vue'

export interface ScrollProgressOptions {
  /** 진행 시작 지점 (viewport 높이 비율, 0.0 = 상단, 1.0 = 하단) */
  start?: MaybeRefOrGetter<number>
  /** 진행 완료 지점 (음수 가능: 화면 위로 지나간 정도) */
  end?: MaybeRefOrGetter<number>
}

export interface ScrollProgressReturn {
  elementRef: Ref<HTMLElement | null>
  progress: Ref<number>
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export function useScrollProgress(options: ScrollProgressOptions = {}): ScrollProgressReturn {
  const { start = 0.5, end = 0 } = options

  const elementRef = ref<HTMLElement | null>(null)
  const progress = ref(0)
  let rafId = 0

  const update = () => {
    if (rafId || !elementRef.value) return

    rafId = requestAnimationFrame(() => {
      rafId = 0
      if (!elementRef.value) return

      const { top } = elementRef.value.getBoundingClientRect()
      const vh = window.innerHeight
      const startPx = vh * toValue(start)
      const endPx = vh * toValue(end)

      if (top > startPx) {
        progress.value = 0
      } else if (top <= endPx) {
        progress.value = 1
      } else {
        progress.value = clamp((startPx - top) / (startPx - endPx), 0, 1)
      }
    })
  }

  onMounted(async () => {
    window.addEventListener('scroll', update, { passive: true })
    await nextTick()
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { elementRef, progress }
}
