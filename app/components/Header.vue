<template>
    <!-- 백드롭 -->
    <Backdrop :active="isMenuOpen" :blur="8" @click="closeMenu" />

    <header>
        <div class="header-container" :class="{ 'header-expanded': isMenuOpen, 'header-shrink': !isMenuOpen }">
            <div class="header-navbar">
                <div class="logo"
                    :class="{ 'logo-rotating-right': isRotatingRight, 'logo-rotating-left': isRotatingLeft }"
                    @mouseenter="triggerLogoRotation('right')" @mouseleave="triggerLogoRotation('left')">
                    <span>B</span>
                </div>
                <div class="title" @mouseenter="handleTitleHover">
                    <span>Binary</span>
                    <span :class="{ 'jump-active': isJumping }">.</span>
                    <span>log</span>
                </div>
                <button 
                    class="menu-button" 
                    type="button" 
                    :aria-label="isMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
                    :aria-expanded="isMenuOpen"
                    @click="toggleMenu"
                >
                    <span class="menu-line" :class="{ 'menu-line-open': isMenuOpen }"></span>
                    <span class="menu-line" :class="{ 'menu-line-open': isMenuOpen }"></span>
                </button>
            </div>
            <div class="header-menu-area">
                <div class="menu-dropdown">
                    <div class="menu-content">
                        <div class="menu-grid">
                            <!-- 좌측: 메뉴 항목 -->
                            <nav class="menu-nav">
                                <a href="#" class="menu-link">
                                    <Icon name="heroicons:academic-cap" class="menu-icon" />
                                    <span>러닝 트랙</span>
                                </a>
                                <a href="#" class="menu-link">
                                    <Icon name="heroicons:document-text" class="menu-icon" />
                                    <span>아티클</span>
                                </a>
                                <a href="#" class="menu-link">
                                    <Icon name="heroicons:user-group" class="menu-icon" />
                                    <span>커뮤니티</span>
                                </a>
                                <a href="#" class="menu-link">
                                    <Icon name="heroicons:book-open" class="menu-icon" />
                                    <span>데브로그</span>
                                </a>
                            </nav>
                            <!-- 우측: 유튜브 영상 -->
                            <div class="menu-video">
                                <iframe
                                    ref="youtubeIframe"
                                    src="https://www.youtube.com/embed/Dv7gLpW91DM?enablejsapi=1"
                                    title="YouTube video"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                    class="video-iframe"
                                ></iframe>
                            </div>
                        </div>
                        <!-- Footer -->
                        <div class="menu-footer">
                            <div class="beta-info">
                                <span class="beta-indicator"></span>
                                <span class="beta-text">Beta Application</span>
                            </div>
                            <p class="footer-text">© 2024 Binary.log</p>
                            <p class="version-info">v1.0.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import Backdrop from './ui/Backdrop.vue'

const isJumping = ref(false)
const isMenuOpen = ref(false)
const isRotatingRight = ref(false)
const isRotatingLeft = ref(false)
const youtubeIframe = ref<HTMLIFrameElement | null>(null)

let rotationTimer: ReturnType<typeof setTimeout> | null = null

const pauseVideo = () => {
    youtubeIframe.value?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo' }),
        'https://www.youtube.com'
    )
}

const triggerLogoRotation = (direction: 'right' | 'left') => {
    if (isRotatingRight.value || isRotatingLeft.value) return

    if (rotationTimer) {
        clearTimeout(rotationTimer)
        rotationTimer = null
    }

    const isRight = direction === 'right'
    isRotatingRight.value = isRight
    isRotatingLeft.value = !isRight

    rotationTimer = setTimeout(() => {
        isRotatingRight.value = false
        isRotatingLeft.value = false
        rotationTimer = null
    }, 1000)
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    triggerLogoRotation(isMenuOpen.value ? 'right' : 'left')
    if (!isMenuOpen.value) pauseVideo()
}

const closeMenu = () => {
    isMenuOpen.value = false
    triggerLogoRotation('left')
    pauseVideo()
}

const handleTitleHover = () => {
    if (isJumping.value) return
    isJumping.value = true
    setTimeout(() => { isJumping.value = false }, 600)
}

onUnmounted(() => {
    if (rotationTimer) clearTimeout(rotationTimer)
})
</script>

<style scoped>
header {
    @apply fixed top-0 left-0 w-full z-50 pointer-events-none p-4;
}

.header-container {
    @apply relative px-4 pointer-events-auto;
    @apply isolate w-96 rounded-xl bg-white/40 shadow-lg ring-1 ring-black/5 backdrop-blur-md;
    @apply left-1/2 -translate-x-1/2;
    /* 닫혀있을 때와 열렸을 때의 width를 반응형으로 정의 */
    @apply [--header-width-closed:100%] [--header-width-open:100%];
    @apply sm:[--header-width-closed:330px] sm:[--header-width-open:70vw];
    @apply md:[--header-width-open:70vw];
    @apply xl:[--header-width-open:60vw];
    width: var(--header-width-closed);
}

/* 큰 화면에서만 애니메이션 적용 */
.header-shrink {
    animation: shrink-header 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes shrink-header {
    0% {
        width: var(--header-width-open);
    }
    60% {
        width: calc(var(--header-width-closed) * 0.9);
    }
    100% {
        width: var(--header-width-closed);
    }
}

/* 메뉴가 열렸을 때 넓어지는 효과 */
.header-expanded {
    animation: expand-header 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes expand-header {
    0% {
        width: var(--header-width-closed);
    }
    60% {
        width: calc(var(--header-width-open) * 1.05);
    }
    100% {
        width: var(--header-width-open);
    }
}

.header-navbar {
    @apply flex items-center justify-between;
    @apply h-16;
}

.logo {
    @apply text-2xl font-logo cursor-pointer font-bold;
}

/* 메뉴 토글 시 회전 애니메이션 */
.logo-rotating-right {
    animation: rotate-right 1s cubic-bezier(0.4, 0, 0.2, 1) 1 forwards;
}
.logo-rotating-left {
    animation: rotate-left 1s cubic-bezier(0.4, 0, 0.2, 1) 1 forwards;
}
@keyframes rotate-right {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes rotate-left {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

.title {
    @apply text-xl font-code cursor-pointer;
    font-weight: 900;
}

.title span:nth-child(2) {
    display: inline-block;
}

.title span:nth-child(2).jump-active {
    animation: jump-dot 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes jump-dot {
    0%, 16.66%, 33.33%, 50%, 66.66%, 100% {
        transform: translateY(0);
    }
    8.33% {
        transform: translateY(-0.8em);
    }
    25% {
        transform: translateY(-0.5em);
    }
    41.66% {
        transform: translateY(-0.3em);
    }
    58.33% {
        transform: translateY(-0.2em);
    }
}

.menu-button {
    @apply flex flex-col justify-center items-center p-2 cursor-pointer;
    @apply relative z-10 w-10 h-10;
}

.menu-line {
    @apply w-6 h-0.5 bg-current text-text;
    @apply absolute;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-line:nth-child(1) {
    transform: translateY(-3px);
}

.menu-line:nth-child(2) {
    transform: translateY(3px);
}

.menu-button .menu-line-open:nth-child(1) {
    transform: rotate(45deg) translateY(0);
}

.menu-button .menu-line-open:nth-child(2) {
    transform: rotate(-45deg) translateY(0);
}

.menu-dropdown {
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* header-expanded 상태일 때 menu-dropdown 자동 열림 */
.header-container.header-expanded .menu-dropdown {
    max-height: 500px;
    opacity: 1;
}

.menu-content {
    @apply p-6;
}

.menu-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.menu-nav {
    @apply flex flex-col gap-2;
}

.menu-link {
    @apply flex items-center gap-3;
    @apply text-lg font-ui transition-colors duration-200;
    @apply hover:text-primary;
}

.menu-icon {
    @apply w-5 h-5 transition-transform duration-200;
}

.menu-link:hover .menu-icon {
    @apply scale-110;
}

.menu-video {
    @apply relative w-full aspect-video rounded-lg overflow-hidden;
    @apply hidden md:block;
}

.video-iframe {
    @apply absolute inset-0 w-full h-full;
}

.menu-footer {
    @apply mt-6;
    @apply flex items-center justify-between;
    @apply cursor-default;
}

.footer-text {
    @apply flex-1 text-sm text-center font-ui opacity-50;
}

.beta-info {
    @apply flex-1 flex items-center justify-start gap-1.5 text-sm opacity-50;
}

.beta-text {
    @apply font-ui;
}

.beta-indicator {
    @apply inline-block w-2 h-2 rounded-full;
    background-color: rgb(var(--color-accent));
    animation: blinking 0.75s ease-in-out infinite;
}

@keyframes blinking {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.3;
    }
}

.version-info {
    @apply flex-1 text-sm text-right font-ui opacity-50;
    @apply hidden sm:block;
}
</style>