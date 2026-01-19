<template>
  <div
    class="backdrop"
    :class="{ 'backdrop-active': active }"
    @click="handleClick"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  /** 백드롭 활성화 여부 */
  active?: boolean
  /** 배경 투명도 (0.0 ~ 1.0) */
  opacity?: number
  /** z-index 값 */
  zIndex?: number
  /** 배경 blur 효과 (px 단위, 예: 4) */
  blur?: number
  /** 배경 색상 (RGB 형식, 예: '0, 0, 0' 또는 '255, 255, 255') */
  bgColor?: string
  /** 트랜지션 지속 시간 (ms 단위) */
  duration?: number
}

interface Emits {
  /** 백드롭 클릭 시 발생 */
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  opacity: 0.3,
  zIndex: 40,
  blur: 0,
  bgColor: '0, 0, 0',
  duration: 300
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  if (props.active) {
    emit('click')
  }
}
</script>

<style scoped>
.backdrop {
  @apply fixed inset-0 pointer-events-none;
  z-index: v-bind(zIndex);
  background-color: rgba(v-bind(bgColor), 0);
  backdrop-filter: blur(0px);
  transition-property: background-color, backdrop-filter;
  transition-duration: v-bind('duration + "ms"');
  transition-timing-function: ease;
}

.backdrop-active {
  @apply pointer-events-auto;
  background-color: rgba(v-bind(bgColor), v-bind(opacity));
  backdrop-filter: blur(v-bind('blur + "px"'));
}
</style>
