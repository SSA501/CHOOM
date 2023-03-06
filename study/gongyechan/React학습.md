
# React

## **React란?**

- Meta에서 개발한 오픈 소스 자바스크립트 라이브러리
- SPA(Single Page Application) 개발
- Virtual DOM(가상 DOM)을 활용하여 업데이트 해야하는 DOM 요소를 찾아 해당 부분만 업데이트하기 때문에 렌더링이 잦은 페이지에서 유리
- JSX 문법 사용
  - JSX(JavaScript XML): JS에 XML를 추가 확장한 문법으로, 브라우저에서 실행하기 전에 바벨을 사용하여 JS 형태의 코드로 변환

## 프로젝트 생성

1. Node.js 설치 (18.14.2 LTS, npm ver. 9.5.0)

   [Node.js](https://nodejs.org/en/)

2. ~~create-react-app 설치~~

   ```powershell
   npm install -g create-react-app

   sudo npm install create-react-app // 위 명령어 에러 발생시
   ```

   [Create React App 오류 (npm tar@2.2.2 오류)](https://velog.io/@jin_devlog/Create-React-App-오류)

3. React 프로젝트 생성

   1. 작업 폴더 생성
   2. 작업 폴더에서 Powershell 열기

      ```powershell
      npx create-react-app 프로젝트명
      ```

4. VS Code로 프로젝트 열기
5. 실행하기

   ```powershell
   npm start
   ```

## 사용시 꼭 알아두기

1. React 버전 확인하기
   1. 현업에서 17버전을 아직 많이 사용하지만 최신 버전은 18.
   2. ReactDOM.render()는 17버전, ReactDOM.createRoot()는 18버전
2. 리액트는 데이터를 중심으로 생각하기
3. 객체를 함부로 바꾸지 않기!!(불변성) → 기존 객체를 복사해서 사용하기
4. Component를 작성한 후 Component 태그를 렌더링 시키기
5. Class를 사용하는 방법도 일반적으로 많이 사용하는 방법은 아님
6. 각 컴포넌트 별로 state는 다름 → state는 컴포넌트마다 별개로 설정
7. JSX 문법 관련 주의 사항
   1. JSX을 사용하기 위해 `<script type="text/babel">` 작성
   2. 열린 태그는 반드시 닫아주기
   3. 속성명에서 camelCase 사용
   4. 반환되는 tag(element)의 class는 className으로 사용!! (class는 JS의 예약어이기 때문)
   5. label의 for 속성은 htmlFor로 대체
   6. 조건문을 넣을 수 있으나 반드시 삼항연산자 사용 (if문 사용 X)

## Class Component

- 클래스로 컴포넌트를 선언
- 예시 코드

  ```jsx
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <script type="text/babel">
  	"use strict";

  	// Class Component
  	class LikeButton extends React.Component {
  		constructor(props) {
  			super(props);
  	    this.state = { liked: false };
  	  }

  		// 화면을 그리는 부분
  	  render() {
  		  if (this.state.liked) {
  		    return "You liked this.";
  	    }

  	    return
  				// <button onClick={() => {this.state.liked = true;}}> // 객체를 직접적으로 수정X
  				<button onClick={() => this.setState({ liked: true })}>
  					Like
  				</button>;
  	  }
  	}
  </script>

  // React 실행
  <script type="text/babel">
  	// React 17 버전 코드
  	ReactDOM.render(<LikeButton />, querySelector("#root"));
  	// React 18 버전 코드
  	ReactDOM.createRoot(document.querySelector("#root")).render(<LikeButton />);
  </script>
  ```

## Function Component

- 함수로 컴포넌트를 선언
- 예시 코드

  ```jsx
  <script type="text/babel">
  	"use strict";

  	// Function Component
  	function LikeButton() {
  		const [liked, setLiked] = React.useState(false); // [state, setState]
  	  if (liked) {
  	    return "You liked this.";
      }
      return (
        <button onclick={() => {setLiked(false);}}>
          Like
        </button>
  	  );
  	}

  	// arrow function
  	const LikeButton = () => {
  		const [liked, setLiked] = React.useState(false); // [state, setState]
  	  if (liked) {
  	    return "You liked this.";
      }
      return (
        <button onclick={() => {setLiked(false);}}>
          Like
        </button>
      );
    };
  </script>

  // React 실행
  <script type="text/babel">
  	// React 17 버전 코드
  	ReactDOM.render(<LikeButton />, querySelector("#root"));
  	// React 18 버전 코드
  	ReactDOM.createRoot(document.querySelector("#root")).render(<LikeButton />);
  </script>
  ```

## Component 작성 순서

1. 이름을 지정하여 Component 생성
2. 바뀌는 값(요소)를 확인하여 state로 지정
3. 화면에 보여야 할 요소(HTML)에 state를 넣어 반환 값으로 설정
4. onClick, onSubmit 등 이벤트에 대한 함수를 선언하여 setState를 통해 state 변화를 주고 화면에 보이게 함

## 함수를 분리해서 선언해보자

- 함수를 태그 안에 선언하면 반환 값이 복잡하게 보여 보기 썩 좋진 않다. 그러므로 함수를 분리해서 선언을 해보자
- 분리하기 전

  ```jsx
  class GuGuDan extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: "",
        result: "",
      };
    }

  	// 반환 값이 매우 길어진다. -> 잘 읽히지 않는다.
    render() {
      return (
        <div>
          <div>
            {this.state.first} X {this.state.second} = ?
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (parseInt(this.state.value) === this.state.first * this.state.second) {
                this.setState({
                  first: Math.ceil(Math.random() * 9),
                  second: Math.ceil(Math.random() * 9),
                  value: "",
                  result: "정답",
                });
              } else {
                this.setState({
                  value: "",
                  result: "땡!",
                });
              }
            }}
          >
            <input type="number" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
            <button>입력</button>
          </form>
          <div>{this.state.result}</div>
        </div>
      );
    }
  ```

- 분리한 후

  ```jsx
  class GuGuDan extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: "",
        result: "",
      };
    }

    // 사용할 함수들
    onChange = (e) => this.setState({ value: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      if (parseInt(this.state.value) === this.state.first * this.state.second) {
        this.setState({
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
          result: "정답",
        });
      } else {
        this.setState({
          value: "",
          result: "땡!",
        });
      }
    };

    // 반환 형태가 더욱 깔끔해 보인다!!
    render() {
      return (
        <div>
          <div>
            {this.state.first} X {this.state.second} = ?
          </div>
          <form onSubmit={this.onSubmit}>
            <input type="number" value={this.state.value} onChange={this.onChange} />
            <button>입력</button>
          </form>
          <div>{this.state.result}</div>
        </div>
      );
    }
  }
  ```

## 참고 자료

[[리액트 무료 강좌 1-1]리뉴얼 - 리액트를 왜 쓰는가?](https://www.youtube.com/watch?v=aYwSrzeyUOk&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)
