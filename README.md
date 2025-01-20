# <img src="https://github.com/CafeFlow/UniFlow_Front/assets/97329075/93c655c8-230b-4bd2-a156-d73599e3f63c" width="100" height="100"> <p>UniFlow</p>

## :computer: 프로젝트 소개
아두이노 센서를 이용해 카페 내 좌석 혼잡도를 확인하는 서비스입니다. 

적외선 센서를 사용하여 사람이 지나갈 때마다 인원을 측정해주는 방식입니다. 카페의 좌석 수를 사전에 체크하여 예를 들어 100석 만석이라 가정하였을때, 

## 프로젝트 기간
2023.08 ~ 2023.12

## :trophy: 성과
2023 "제 10회 전자정보통신공학과 P.A.E 학술제" **🥇대상** <br />
2023 멋쟁이사자처럼 X 세종대학교 창업지원단  IT 창업 기획 컨퍼런스  **🥉우수상**

## 팀원 소개
- 김남진 : PM

- 김준영 : FE

- 김채원 : BE

- 송성환 : Designer

## 사용 기술 및 라이브러리
- React
  - Express
  -  Github Actions

- Spring Boot
  - REST API
  - AWS
  - Github Actions
  - MySQL

## 페이지 구성

### 1. 메인 페이지
<img src="https://github.com/CafeFlow/UniFlow_Front/assets/97329075/7ebe9d27-d11f-422f-9aaf-42f71eb79071" width="300" height="650">

메인 페이지입니다. 해당 화면에서 카페를 클릭 시 화면 하단에서 모달 창이 올라옵니다.

### 2. 모달
<img src="https://github.com/CafeFlow/UniFlow_Front/assets/97329075/d512bbc4-53ce-4514-8dc9-6afdd73681a1" width="300" height="650">

모달 축소 버전입니다. 축소 버전에서는 클릭한 카페에 대한 요약된 정보가 업로드 되어있습니다. 

카페의 혼잡도에 따라 컵의 색이 다음과 같이 바뀝니다.

**50% 이하의 경우**, 초록색

**50% ~ 79%의 경우**, 노란색

**80% 이상의 경우**, 빨간색


### 3. 모달 - 리뷰
<img src="https://github.com/CafeFlow/UniFlow_Front/assets/97329075/f372ef4b-e2f5-4936-9839-93e68912a438" width="300" height="650">
<img src="https://github.com/CafeFlow/UniFlow_Front/assets/97329075/b7184208-414c-4f64-8aff-e3f17114bd23" width="300" height="650">

해당 화면에서 카페에 대한 리뷰 및 평점을 남길 수 있습니다. 


## 배운점
- 디자이너와 첫 협업 프로젝트로 디자이너와 소통하는 능력을 기르는데 도움이 되었습니다.
- 연세대학교 경영학과 학우들과의 협업을 진행하여 작게나마 실무를 경험했다고 생각합니다.
- 카카오 맵 API를 사용하여 지도를 구현하였고 JSX 문법을 이용해 커스텀 오버레이를 생성했습니다.
- 첫 React 프로젝트로 **반응형 웹, 비동기 처리, recoil 등 React를 깊게 이해했습니다.
- ES6 문법에 대해 깊은 이해했습니다.
- useState, useEffect를 사용하여 JS Hooks에 대해 이해했습니다.
- CRUD를 이용하여 리뷰 및 별점 생성, 삭제, 수정 기능을 구현했습니다.
- Express 서버를 사용하여 자동 배포에 대해 자세히 알게되는 계기가 되었습니다.
- AWS를 이용한 배포를 하기 위해 AWS에 대해 깊게 공부했습니다.
- module.css를 사용하면 다른 js파일에 영향을 끼치지 않는다는 것을 알게되었습니다.
- Modal 구현 및 애니메이션에 대한 깊은 이해를 했습니다.
- 커스텀 오버레이를 생성하여 카카오 맵에서 제공하는 핑 대신 커스텀 핑을 생성했습니다.
- 컴포넌트 분리를 통해 PC & Mobile 버전의 css를 분리했습니다.

## 아쉬운점
- Github ci/cd를 사용하려고 했으나 실패했습니다.
- 아두이노 기계 장비 오류로 인해 더 이상 프로젝트를 진행하지 못했습니다.
- 태블릿 규격의 css를 마치지 못했습니다.

