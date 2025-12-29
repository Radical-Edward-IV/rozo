# 폰트 설정 가이드

## 개요

이 프로젝트는 3가지 한글 폰트를 사용합니다:
- **Pretendard**: 콘텐츠 영역의 기본 폰트
- **Nanum Gothic**: 기능/UI 영역의 폰트
- **Nanum Gothic Coding**: 코드 영역의 폰트

## 현재 설정 구성

### 1. Pretendard
- **상태**: 로컬 파일 보유 (`assets/fonts/pretendard/`)
- **CDN**: 미설정 (추가 필요 시 `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css`)
- **파일 위치**: `assets/fonts/pretendard/web/static/woff2-subset/`
- **라이선스**: SIL Open Font License 1.1 (무료, 상업적 사용 가능)

### 2. Nanum Gothic
- **상태**: 네이버 CDN 사용
- **CDN URL**: `https://hangeul.pstatic.net/hangeul_static/css/nanum-gothic.css`
- **설정 위치**: `nuxt.config.ts`의 `app.head.link`에 등록됨

### 3. Nanum Gothic Coding
- **상태**: 네이버 CDN 사용
- **CDN URL**: `https://hangeul.pstatic.net/hangeul_static/css/nanum-gothic-coding.css`
- **설정 위치**: `nuxt.config.ts`의 `app.head.link`에 등록됨

## 폰트 사용 규칙

### 콘텐츠 영역 (Pretendard)

#### 제목 요소
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`: **Pretendard** 사용
  - 굵기만 조절하여 계층 구조 표현
  - 예: `h1` → Bold(700), `h2` → SemiBold(600), `h3` → Medium(500)

#### 본문 요소
- `p`, `li`, `article`: **Pretendard Regular(400)** 사용
- 기본 본문 텍스트에 적용

#### 강조 텍스트
- 강조가 필요한 텍스트: **Pretendard SemiBold(600)** 사용
- 예: `<strong>`, `<em>`, 또는 특정 클래스로 강조 표시

### 기능/UI 영역 (Nanum Gothic)

#### 네비게이션 및 레이아웃
- `nav`: **Nanum Gothic** 사용
- `aside`: **Nanum Gothic** 사용
- `footer`: **Nanum Gothic** 사용

#### UI 컴포넌트
- `button`: **Nanum Gothic** 사용
- `badge`: **Nanum Gothic** 사용
- `meta` (메타 정보): **Nanum Gothic** 사용
- `toc` (목차): **Nanum Gothic** 사용

### 코드 영역 (Nanum Gothic Coding)

#### 코드 표시
- `pre`: **Nanum Gothic Coding** 사용
- `code`: **Nanum Gothic Coding** 사용
- 코드 블록, 인라인 코드 모두 적용