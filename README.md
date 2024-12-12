# mynnect.

## 목표

1. Next.js에 대한 이해
2. 서버/ 클라이언트 상태 분리하여 관리
3. 파이어베이스 연동으로 빠른 프로토타입 구축
4. Jest를 활용한 유닛 테스트 적용

## 기술 스택

[![React](https://skillicons.dev/icons?i=nextjs)](https://nextjs.org/)
[![TypeScript](https://skillicons.dev/icons?i=ts)](https://www.typescriptlang.org/)
[![TailwindCSS](https://skillicons.dev/icons?i=tailwind)](https://tailwindcss.com/)
[![Firebase](https://skillicons.dev/icons?i=firebase)](https://firebase.google.com/docs?hl=ko)
[![Jest](https://skillicons.dev/icons?i=jest)](https://jestjs.io/)

## 프로젝트 폴더 구조

```
mynnect/
├── public/  # 정적 파일
├── src/  # 소스 코드
│   ├── __test__/ # 테스트 코드
│   ├── app/ # 앱 라우터
│   ├── components/ # UI 컴포넌트
│   ├── config/ # 설정 파일
│   ├── hooks/  # 커스텀 훅
│   ├── service/  # API 호출 및 데이터 처리
│   ├── store/  # 전역 상태 관리
│   ├── styles/ # 전역 스타일
│   ├── types/  # 타입 정의
│   ├── utils/  # 유틸리티 함수
```

## 트러블 슈팅

## Git 커밋 메시지 컨벤션

| 타입        | 내용                                      |
| ----------- | :---------------------------------------- |
| 🎉 init     | 프로젝트 생성 및 초기화                   |
| ✨ feat     | 새로운 기능 추가                          |
| 💄 style    | UI 구현/ 수정                             |
| ♻️ refactor | 코드 리팩토링                             |
| 🐛 fix      | 버그 수정에 대한 커밋                     |
| 🔧 chore    | 기타 개발 환경 또는 문서 수정에 대한 커밋 |
| 📝 docs     | 문서 생성, 수정                           |

## 실행 방법

```bash
# 1. .env.example 참고하여 본인의 Firebase API Key로 변경 후 .env로 파일명 변경

# 2. 의존성 설치
pnpm install
# 또는 pnpm-lock.yaml 삭제 후 선호하는 패키지 매니져로 의존성 설치

#3-1. dev 모드 서버 실행
pnpm dev

#3-2. 배포 준비
pnpm build

#3-3. prod 모드 서버 실행
pnpm start
```
