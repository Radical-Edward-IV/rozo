# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

ROZO (Record of Zero & One)는 강의 자료, 동영상 강의, 기술 블로그, 개발자 일지를 결합한 한국어 교육 플랫폼입니다. Nuxt 4로 구축되었으며 GitHub Pages에 SPA로 배포됩니다.

**핵심 목적**: 체계적인 학습 경로, 유튜브 통합 강의, 지식 공유를 통해 개발자의 기술적 성장을 지원합니다.

## 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 로컬 미리보기
npm run preview

# 정적 사이트 생성
npm run generate
```

## 배포

- **플랫폼**: GitHub Pages (SPA 모드)
- **Base URL**: `/rozo/`
- **빌드 프리셋**: `github_pages`
- **트리거**: `main` 브랜치에 push 시 자동 배포 (GitHub Actions)
- **워크플로우**: `.github/workflows/deploy.yml`에서 `npx nuxt build --preset github_pages`로 빌드

## 아키텍처

### 기술 스택

- **프레임워크**: Nuxt 4 (Vue 3, `ssr: false`로 SPA 모드)
- **스타일링**: Tailwind CSS + 커스텀 디자인 시스템
- **타이포그래피**:
  - 로고: Climate Crisis KR (가변 폰트)
  - 본문: Pretendard
  - UI: Nanum Gothic
  - 코드: Nanum Gothic Coding

### 프로젝트 구조

```
app/
├── app.vue              # 루트 컴포넌트 (Header + NuxtPage)
├── assets/
│   ├── css/main.css     # 디자인 시스템 소스 (Source of Truth)
│   └── fonts/           # 자체 호스팅 폰트
├── components/          # Vue 컴포넌트
├── composables/         # 공유 컴포저블 함수
└── pages/               # 파일 기반 라우팅
```

### 디자인 시스템

디자인 시스템은 `app/assets/css/main.css`에 CSS 변수로 중앙 집중화되어 있습니다:

**컬러** (투명도 지원을 위한 RGB 형식):
- `--color-primary`: #0000eb (파랑)
- `--color-accent`: #eb0000 (빨강)
- `--color-bg`: #ffffff
- `--color-text`: #1a1a1a
- `--color-border`: #e7e7e7

**Tailwind 매핑**: `text`, `bg`, `primary`, `accent`, `border` 클래스를 사용하면 `rgb(var(--color-*) / <alpha-value>)` 형식으로 CSS 변수에 매핑됩니다.

**폰트 사용**:
- 로고 요소: `font-logo`
- 본문/콘텐츠: `font-content` (body에 `@apply font-content`로 기본 적용)
- UI 요소 (nav, button 등): `font-ui`
- 코드 블록: `font-code`

### 설정

- **Nuxt 설정** (`nuxt.config.ts`):
  - Base URL: GitHub Pages를 위한 `/rozo/`
  - SSR 비활성화 (`ssr: false`)
  - Tailwind 모듈 통합
  - 외부 폰트 CDN 로드 (Nanum Gothic, Nanum Gothic Coding)

- **Tailwind 설정** (`tailwind.config.js`):
  - 다크 모드: 클래스 기반
  - 컨텐츠 소스: `app/**/*.{js,vue,ts}`
  - 커스텀 유틸리티: `.no-scrollbar`, `.truncate-2`

### Composables

**useScrollExpand** (`app/composables/useScrollExpand.ts`):
- 요소가 위로 스크롤될 때 padding과 border-radius를 점진적으로 축소
- 설정 가능한 threshold (viewport 비율), 초기 padding/border-radius
- 반응형 `padding`, `borderRadius` ref 및 바인딩용 `elementRef` 반환
- 스크롤 기반 UI 변환에 사용 (예: 히어로 섹션 확장 효과)

## 콘텐츠 전략

4가지 콘텐츠 카테고리:
1. **강의 자료** - 무료 커리큘럼 기반 콘텐츠
2. **동영상 강의** - 유튜브 연동 (무료/유료 멤버십)
3. **기술 블로그** - 포트폴리오 및 이직용 심층 아티클
4. **개발자 일지** - 개인적 인사이트와 학습 여정

콘텐츠 관리는 마크다운 기반이며 유연한 카테고리 분류를 지원할 예정입니다.

## 코딩 컨벤션

- **한국어 사용**: 프로젝트 문서, UI 텍스트, 주석은 주로 한국어로 작성
- **스타일링 접근**: Tailwind 유틸리티 클래스 사용, 필요시 `main.css`에 커스텀 유틸리티 추가
- **컴포넌트 구조**: 단순하고 콘텐츠 중심의 설계 (과도한 엔지니어링 지양)
- **폰트 할당**: CSS 변수를 통한 시맨틱 폰트 패밀리 사용 (폰트명 하드코딩 금지)

## 향후 계획

- 콘텐츠 관리 시스템(CMS) 구축
- 유튜브 임베드 컴포넌트
- 검색 기능
- 다크/라이트 테마 토글 (인프라는 `darkMode: 'class'`로 부분 준비됨)
