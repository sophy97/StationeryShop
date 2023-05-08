# personal project

### <🔎 CRA 통해 제작한 문구류 기본 쇼핑몰입니다>

### [StationeryStation](https://sophy97.github.io/StationeryShop/)_(바로가기)_

#### 📆 기간

**2023.04.18 ~ 04.30 (약 2주)**

#### 🖥️ 사용 기술

**JavaScript(ES6) / React / CSS**

#### React-Router / Firebase / localStorage

- **라이브러리 사용 최소화**, 직접 기능을 구현하며 **리액트 hooks** 복습
- 페이지 간 이동을 라우팅 처리하여 SPA로 구성. 필요한 부분만 업데이트
- localStorage에 카트와 사용자 정보 저장 ⇒ **새로고침 후**에도 기록 유지

<br />

## 😶 Preview 😶 
### Home
![홈 화면](https://raw.githubusercontent.com/sophy97/StationeryShop/master/src/assets/01_Home.jpg)
- 홈 화면의 첫 부분입니다.
### Shop
<img src="https://raw.githubusercontent.com/sophy97/StationeryShop/master/src/assets/02_Shop.jpg" width="400" /><img src="https://raw.githubusercontent.com/sophy97/StationeryShop/master/src/assets/03_Shop.jpg" width="400" />
- 상품 상세페이지를 카드 형태로 구현, 누르면 각 제품의 상세 페이지로 이동합니다.
- 카드는 미디어 쿼리를 통해 4개, 3개, 2개로 화면 사이즈에 맞게 반응합니다.
- filter(), sort() 메서드를 통해 가격순, 인기순 필터 구현 / includes()로 상품 제목 검색 구현

### Login / Cart
<img src="https://raw.githubusercontent.com/sophy97/StationeryShop/master/src/assets/04_login.jpg" width="400" /><img src="https://raw.githubusercontent.com/sophy97/StationeryShop/master/src/assets/05_cart.jpg" width="400" />
- 로그인 후 navbar의 변화 / cart에 상품 담고 수량 조절, 총 가격 계산 (ContextAPI)로 관련 state 전역 관리
- 장바구니 모달에서 '주문하기'를 통해 로컬스토리지에 카트 정보가 저장됩니다. 

### Mypage
<img src="https://raw.githubusercontent.com/sophy97/StationeryShop/master/src/assets/06_local.jpg" width="800" />
- 마이페이지로 이동하여 주문 내역을 불러오고, 로컬스토리지의 기록을 삭제하여 초기화할 수 있습니다.
