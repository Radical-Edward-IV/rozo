<template>
  <!-- Hero Section -->
  <section class="hero-section">
    <header class="hero-header">
      <p class="hero-subtitle">Record of Zero & One</p>
      <h1 class="hero-title">0과 1의 기록</h1>
      <p class="hero-tagline">함께 기록하는, 기술 여정의 시작</p>
      <p class="hero-tagline">AI 시대를 위한 코딩을 배우다</p>
    </header>

    <div
      ref="heroImageRef"
      class="hero-image-wrapper"
      :style="{ padding: `0 ${heroExpand.padding}rem` }"
    >
      <div
        class="hero-image"
        :style="{
          backgroundImage: `url(${heroImage})`,
          borderRadius: `${heroExpand.borderRadius}rem`
        }"
      >
        <div class="hero-cta">
          <h2>Where the best learn from the best.</h2>
          <nav class="hero-nav">
            <NuxtLink to="/tracks" class="btn btn-primary">
              <span>Learning Tracks</span>
              <Icon name="heroicons:arrow-right" />
            </NuxtLink>
            <NuxtLink to="/articles" class="btn btn-secondary">
              <span>Articles</span>
              <Icon name="heroicons:arrow-right" />
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </section>

  <!-- Intro Section: 스크롤 기반 텍스트 채우기 효과 -->
  <div ref="introRef" class="intro-wrapper">
    <section class="intro-section">
      <p class="intro-question">당신의 아이디어, 현실이 될 준비가 되었습니다.</p>
      <div class="intro-lines">
        <span
          v-for="(line, i) in INTRO_LINES"
          :key="i"
          class="intro-line"
          :style="{ '--fill': `${calcLineFill(i)}%` }"
        >{{ line }}</span>
      </div>
    </section>
  </div>

  <!-- TODO: 추가 섹션 (Tracks, Articles, Footer 등) -->
  <div class="spacer" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useScrollProgress } from '~/composables/useScrollProgress'
import { useImageRotation } from '~/composables/useImageRotation'

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const HERO_IMAGES = [
  '/rozo/hero/Glow-Black-And-White-GIF-by-xponentialdesign_1.gif',
  '/rozo/hero/Glow-Black-And-White-GIF-by-xponentialdesign_2.gif',
  '/rozo/hero/Glow-Black-And-White-GIF-by-xponentialdesign_3.gif'
] as const

const HERO_DURATIONS = [5000, 3000, 5000] as const

const INTRO_LINES = [
  '떠오른 아이디어를 바로 만들어봅니다.',
  'AI는 구현을 돕고, 당신은 방향을 설계합니다.',
  '오래 배우기보다, 빠르게 만들어보는 학습.',
  '결과를 만드는 과정이 곧 학습입니다.',
  '생각을 현실로 옮기는 가장 빠른 방법.'
] as const

// ─────────────────────────────────────────────
// Responsive
// ─────────────────────────────────────────────
const isMobile = useMediaQuery('(max-width: 768px)')

// ─────────────────────────────────────────────
// Hero Image Rotation
// ─────────────────────────────────────────────
const { currentImage: heroImage } = useImageRotation({
  images: HERO_IMAGES,
  durations: HERO_DURATIONS
})

// ─────────────────────────────────────────────
// Hero Scroll Expand Effect
// ─────────────────────────────────────────────
const { elementRef: heroImageRef, progress: heroProgress } = useScrollProgress({
  start: () => isMobile.value ? 0.4 : 0.5,
  end: () => isMobile.value ? 0.3 : 0.3
})

const heroExpand = computed(() => {
  const scale = 1 - heroProgress.value
  return {
    padding: (isMobile.value ? 1 : 2) * scale,
    borderRadius: (isMobile.value ? 0.5 : 0.75) * scale
  }
})

// ─────────────────────────────────────────────
// Intro Scroll Text Fill Effect
// ─────────────────────────────────────────────
const { elementRef: introRef, progress: introProgress } = useScrollProgress({
  start: 0,
  end: -0.5
})

/** 각 줄의 채우기 퍼센트 계산 (0~100) */
const calcLineFill = (index: number): number => {
  const total = INTRO_LINES.length
  const perLine = 1 / total
  const lineStart = index * perLine
  const lineEnd = (index + 1) * perLine
  const p = introProgress.value

  if (p <= lineStart) return 0
  if (p >= lineEnd) return 100
  return ((p - lineStart) / perLine) * 100
}
</script>

<style scoped>
/* ─────────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────────── */
.hero-section {
  @apply flex flex-col;
}

.hero-header {
  @apply text-center pt-36 pb-16;
}

.hero-title {
  @apply font-bold pb-8;
  @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl;
}

.hero-subtitle {
  @apply text-sm text-balance p-4 opacity-50;
}

.hero-tagline {
  @apply text-balance text-text;
  @apply text-base sm:text-xs md:text-base;
}

.hero-image-wrapper {
  @apply w-full;
}

.hero-image {
  @apply relative mx-auto aspect-[21/9] bg-cover bg-center bg-no-repeat;
}

.hero-cta {
  @apply absolute top-2/3 -translate-y-1/2 ml-[5vw];
}

.hero-cta h2 {
  @apply text-white;
  font-size: clamp(1rem, 4.5vw, 4.5rem);
}

.hero-nav {
  @apply flex gap-3 mt-4;
}

/* ─────────────────────────────────────────────
   Buttons
   ───────────────────────────────────────────── */
.btn {
  @apply inline-flex items-center justify-center font-bold rounded-md;
  @apply transition-all duration-300;
  font-size: clamp(0.75rem, 2vw, 1.25rem);
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 2rem);
}

.btn :deep(svg) {
  @apply ml-2 transition-transform duration-300;
}

.btn:hover :deep(svg) {
  @apply translate-x-1;
}

.btn-primary {
  @apply bg-white text-neutral-900 border border-white;
  @apply hover:bg-white/90;
}

.btn-secondary {
  @apply bg-transparent text-white border border-white/50;
  @apply hover:bg-white/10 hover:border-white;
}

/* ─────────────────────────────────────────────
   Intro Section (Text Fill Effect)
   ───────────────────────────────────────────── */
.intro-wrapper {
  @apply h-[180vh] md:h-[200vh] lg:h-[200vh];
}

.intro-section {
  @apply sticky top-0 px-8 py-16 md:py-20;
  @apply h-[90vh] md:h-screen;
  @apply flex flex-col items-center justify-center;
}

.intro-question {
  @apply text-center text-balance opacity-40 font-medium mb-8;
  font-size: clamp(0.6875rem, 2.1vw, 1.125rem);
}

.intro-lines {
  @apply flex flex-col gap-6 text-center;
}

.intro-line {
  --fill: 0%;
  --text-color: theme('colors.text');
  --text-color-light: color-mix(in srgb, var(--text-color) 20%, transparent);

  @apply block font-bold;
  font-size: clamp(1rem, 2.5vw, 3rem);

  background: linear-gradient(
    to right,
    var(--text-color) var(--fill),
    var(--text-color-light) var(--fill)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ─────────────────────────────────────────────
   Utilities
   ───────────────────────────────────────────── */
.spacer {
  @apply h-[120vh];
}
</style>
