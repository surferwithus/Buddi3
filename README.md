# Buddi3 🐾

반려동물 입양을 위한 웹 플랫폼입니다. 공공데이터포털의 유기동물 정보를 활용하여 보호소에 있는 반려동물을 검색하고 입양할 수 있도록 도와주는 서비스입니다.

## 링크

- [vercel 배포] https://buddi3.vercel.app
- [Github Repository] https://github.com/surfwithus/Buddi3

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 페이지](#주요-페이지)
- [API 연동](#api-연동)

## ✨ 주요 기능

- **반려동물 검색**: 지역, 종류, 상태 등 다양한 조건으로 유기동물 검색
- **상세 정보 조회**: 각 반려동물의 상세 정보 및 이미지 확인
- **보호소 정보**: 전국 보호소 위치 및 정보 제공 (Google Maps 연동)
- **입양 가이드**: 입양 절차 및 체크리스트 제공
- **입양 후기**: 입양 경험 공유
- **대시보드**: 통계 및 데이터 시각화

## 🛠 기술 스택

### Frontend
- **Next.js 16** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **React 19** - UI 라이브러리

### 주요 라이브러리
- **@react-google-maps/api** - Google Maps 연동
- **@radix-ui/react-accordion** - UI 컴포넌트
- **lucide-react** - 아이콘
- **recharts** - 차트 및 데이터 시각화

### API
- **공공데이터포털 유기동물 공공 API** - 유기동물 정보
- **공공데이터포털 보호소 API** - 보호소 정보

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론
```bash
git clone <repository-url>
cd Buddi3
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 확인
```
http://localhost:3000
```

### 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
Buddi3/
├── app/                    # Next.js App Router 페이지
│   ├── about/             # 소개 페이지
│   ├── api/               # API 라우트
│   │   ├── pets/         # 반려동물 API
│   │   └── shelters/     # 보호소 API
│   ├── dashboard/        # 대시보드 페이지
│   ├── detail/           # 상세 페이지
│   ├── guide/            # 입양 가이드
│   ├── home/             # 홈 페이지
│   ├── review/           # 입양 후기
│   ├── search/           # 검색 페이지
│   └── shelter/          # 보호소 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── Footer.tsx        # 푸터
│   └── Header.tsx        # 헤더
├── lib/                   # 유틸리티 및 API 클라이언트
│   ├── api-client.ts     # API 클라이언트
│   ├── geocoding.ts      # 지오코딩 유틸리티
│   └── utils/            # 기타 유틸리티
├── mock-data/            # 목업 데이터
├── public/               # 정적 파일
└── styles/               # 전역 스타일
```

## 📄 주요 페이지

### 홈 (`/`)
- 히어로 섹션
- 최근 등록된 반려동물
- 서비스 소개

### 검색 (`/search`)
- 다양한 필터를 통한 반려동물 검색
- 페이지네이션

### 상세 (`/detail/[petId]`)
- 반려동물 상세 정보
- 이미지 갤러리
- 보호소 연락처

### 대시보드 (`/dashboard`)
- 통계 및 데이터 시각화
- 반려동물 현황 분석

### 입양 가이드 (`/guide`)
- 입양 절차 안내
- 체크리스트
- FAQ

### 입양 후기 (`/review`)
- 입양 경험 공유
- 후기 카드

### 보호소 (`/shelter`)
- 보호소 목록
- 지도 표시

### 소개 (`/about`)
- 미션 및 비전
- 기술 스택
- 연락처

## 🔌 API 연동

### 공공데이터포털 API

프로젝트는 공공데이터포털의 다음 API를 사용합니다:

- **유기동물 공공 API**: `abandonmentPublicService_v2`
- **보호소 API**: `shelter_v2`

API 클라이언트는 `lib/api-client.ts`에 구현되어 있으며, Next.js API 라우트를 통해 프록시됩니다.

### API 엔드포인트

- `GET /api/pets` - 반려동물 목록 조회
- `GET /api/pets/[id]` - 특정 반려동물 상세 정보
- `GET /api/shelters` - 보호소 목록 조회

## 📝 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행

## 🌐 환경 변수

필요한 경우 `.env.local` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
# Google Maps API Key (필요한 경우)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여

이슈나 풀 리퀘스트를 환영합니다!

---

Made with ❤️ for abandoned animals
