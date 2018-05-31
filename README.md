# Schapi-Node

Schapi Node는 Schapi의 Node.JS 버전으로  
Node.JS 기반의 급식, 학사일정 파싱 라이브러리입니다.  

## 1. 설치  

schapi-node 는 GOPATH의 프로젝트에 다음과 같이 설치할 수 있습니다.  

```
npm install schapi
```

## 2. 예제

다음은 대덕소프트웨어마이스터고등학교 (G100000170) 의 5월 23일자 점심  
식단표를 불러와 출력하는 예제입니다.

```
// Type의 기본값은 (HIGH - 고등학교: 4) 입니다
let api = new SchoolAPI(SchoolAPI.Region.DAEJEON, "G100000170", SchoolAPI.Type.HIGH)

// Sync
console.log(api.getMonthlyMenus(2018, 5)[23].lunch)

// Async
api.getMonthlyMenus(2018, 5)
    .then(menus => console.log(menus[23].lunch))
    .catch(error => console.error(error))
```

## 3. 음;

현재 작성된 Schapi-Node 의 1.0.0 버전은 대략적인 구조만 완성된
미완성 버전입니다! 대략적인 API를 갖춘 1.1.0 버전을 이용해주세요!
