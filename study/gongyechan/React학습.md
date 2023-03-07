# React에 대해 알아보자

# 목차

# **React란?**

- Meta에서 개발한 오픈 소스 자바스크립트 **라이브러리**
- **SPA(Single Page Application)** 개발
- **Virtual DOM(가상 DOM)**을 활용하여 업데이트 해야하는 DOM 요소를 찾아 해당 부분만 업데이트하기 때문에 렌더링이 잦은 페이지에서 유리
- JSX 문법 사용
  - **JSX(JavaScript XML)**: JS에 XML를 추가 확장한 문법으로, 브라우저에서 실행하기 전에 바벨을 사용하여 JS 형태의 코드로 변환

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

1. **React 버전 확인**하기
   1. 현업에서 17버전을 아직 많이 사용하지만 최신 버전은 18.
   2. `ReactDOM.render()`는 17버전, `ReactDOM.createRoot()`는 18버전
2. React에서는 **화면을 변경(dom 조작)하는 것이 아니라 데이터를 변경**해야 된다
3. 객체를 함부로 바꾸지 않기!!(**불변성**) → 기존 객체를 복사해서 사용하기
4. Component를 작성한 후 Component 태그를 렌더링 시키기
5. Class를 사용하는 방법도 일반적으로 많이 사용하는 방법은 아님
6. 각 컴포넌트 별로 state는 다름 → state는 컴포넌트마다 별개로 설정
7. JSX 문법 관련 주의 사항
   1. JSX을 사용하기 위해 `<script type="text/babel">` 작성
   2. 열린 **태그는 반드시 닫아주기**
   3. 속성명에서 camelCase 사용
   4. 반환되는 tag(element)의 class는 className으로 사용!! (class는 JS의 예약어이기 때문)
   5. label의 for 속성은 htmlFor로 대체
   6. 조건문을 넣을 수 있으나 반드시 삼항연산자 사용 (if문 사용 X)

# Component

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
  	ReactDOM.render(<LikeButton />, document.querySelector("#root"));
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
  	ReactDOM.render(<LikeButton />, document.querySelector("#root"));
  	// React 18 버전 코드
  	ReactDOM.createRoot(document.querySelector("#root")).render(<LikeButton />);
  </script>
  ```

## Component 작성 순서

1. 이름을 지정하여 Component 생성
2. 바뀌는 값(요소)를 확인하여 state로 지정
3. 화면에 보여야 할 요소(HTML)에 state를 넣어 반환 값으로 설정
4. onClick, onSubmit 등 이벤트에 대한 함수를 선언하여 setState를 통해 state 변화를 주고 화면에 보이게 함

### 함수를 분리해서 선언해보자

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

## Props

- 부모 컴포넌트로부터 물려받는 **속성**
- 부모 컴포넌트에서 전달하는 props가 변경되면 자동으로 업데이트
- 부모 컴포넌트에서 자식 컴포넌트를 부착할 때 **`<자식컴포넌트 속성이름=값 속성이름=값 />`** 형태로 사용하면 자식 컴포넌트에서 해당 변수를 **`this.props.속성이름`** 형태로 접근할 수 있음
  ```jsx
  // React 17 버전 코드
  ReactDOM.render(<Component name=value name=value/>, document.querySelector("#id"));
  // React 18 버전 코드
  ReactDOM.createRoot(document.querySelector("#id")).render(<Component name=value />);
  ```
- 코드 예시
  ```jsx
  // 문자열은 따옴표"", 다른 자료형은 중괄호{}를 사용하여 전달한다
  ReactDOM.createRoot(document.querySelector("#id")).render(<Basic name="Yechan" birth={1994} />);
  ```

### PropTypes

- prop-types 패키지를 설치해야 사용할 수 있음 → `npm install prop-types`
- props가 propTypes의 자료형과 일치하는지 검사
- isRequired가 붙으면 필수적으로 일치해야 에러가 발생하지 않으며, isRequired가 붙지 않으면 선택적으로 자료형을 붙여줌
- 예시
  ```jsx
  Basic.propTypes = {
    name: PropTypes.string.isRequired,
    birth: PropTypes.number.isRequired,
    region: PropTypes.string,
  };
  ```

### Props Children

```jsx
// 컴포넌트 안에 this.props.children을 사용하여 선언
const Parent = () => {
  return (
    <div id="parent">{this.props.children}</div>
  );
};

// render에서 <Parent />로 사용하지 않고 태그 안에 내용물을 넣어서 사용
ReactDOM.createRoot(document.querySelector("#id"))
	.render(
		<Parent>
		  <span>Hello</span>
		</Parent>
	);

...

// 실제 렌더링 되는 HTML
<div id="parent"><span>Hello</span></div>
```

## State

- state는 해당 컴포넌트에만 적용되는 상태
- 컴포넌트 생성시 가장 먼저 설정되는 것이기 때문에 constructor 안에 선언 (Class 컴포넌트 기준)
- state는 다른 컴포넌트에 props를 통해 넘겨줄 수 있음

### SetState

- setState는 state 변화를 줄 때 사용하는 함수
- state는 `this.state.이름 = 바꿀 값;` 형태가 아닌 **`this.setState((이전 상태) => ({ 이름: 바꿀 값 }));`** 를 통해 변경(**직접적인 변경 X**)
- setState 함수는 **비동기**이기 때문에 조심하기!!
- setState를 활용한 예시 코드

  ```jsx
  state = { name: "yechan", age: 28 };

  onClick = (e) => this.setState({ name: "Yessan", age: 27 });

  render() {
    return (
      <React.Fragment>
        <button onClick={this.onClick}>버튼</button>
      </React.Fragment>
    );
  }
  ```

- 이전 state의 값을 사용해야 할 때 setState 안에서 함수 형태와 return을 사용하기!!

  ```jsx
  state = { name: "yechan", age: 28 };

  onClick = (e) =>
  	this.setState((prevState) => {
  		return {
  			name: "Yessan",
  			age: prevState.age - 1  // 이전 state의 age 값에서 1을 뺀 값으로 변경
  		};
  	});

  render() {
    return (
      <React.Fragment>
        <button onClick={this.onClick}>버튼</button>
      </React.Fragment>
    );
  }
  ```

## Reference

- **ref 속성**은 컴포넌트의 메소드에서 **컴포넌트의 태그에 직접 접근할 때** 사용하는 것

  ```jsx
  this.hide;

  onClickButton = () => {
    this.setState({ hidden: true });
  	// this.hide로 button 태그에 접근
    this.hide.disabled = true;
  };

  render() {
    return (
  		// this.hide 속성에 자기 자신(ref)를 대입
      <button ref={(ref) => { this.hide = ref; }}>숨기기</button>
    );
  }
  ```

- React 16.3버전부터 **`React.createRef()`**가 추가되어, 이를 사용하여 접근이 가능합니다.

  ```jsx
  this.hide = React.createRef();

  onClickButton = () => {
    this.setState({ hidden: true });
  	// createRef를 사용할 때는 접근시 current를 붙여줘야 한다!!
    this.hide.current.disabled = true;
  };

  render() {
    return (
      <button ref={this.hide}>숨기기</button>
    );
  }
  ```

# React 생명 주기(Life Cycle)

- 컴포넌트는 **생성(mounting)** -> **업데이트(updating)** -> **제거(unmounting)**의 생명주기
  ![Untitled](React%E1%84%8B%E1%85%A6%20%E1%84%83%E1%85%A2%E1%84%92%E1%85%A2%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%20aae77f8593f3448589679d007c40e916/Untitled.png)
- **Class Component**는 **Life Cycle Method**를 사용
- **Function Component**는 **Hook**을 사용

## 클래스 컴포넌트 생명 주기 (Class Component Life Cycle)

1. **생성(mount)**
   - **constructor**
     - 컴포넌트 생성자 메서드 (가장 먼저 실행)
     - this.props, this.state에 접근 가능
     - 리액트 요소 반환
   - **getDerivedStateFromProps**
     - props로 받아온 것을 state에 넣어주고 싶을때 사용
   - **render**
     - 컴포넌트를 렌더링하는 메서드
   - **componentDidMount**
     - 컴포넌트의 렌더링이 마치면 호출되는 메서드
     - DOM을 사용해야 하는 외부 라이브러리 연동
     - 해당 컴포넌트에서 필요로하는 데이터를 ajax로 요청
2. **업데이트(update)**
   - **getDerivedStateFromProps**
     - 컴포넌트의 props가 바뀌었을때 호출
     - props의 변경에 따라 state도 같이 변경
   - **shouldComponentUpdate**
     - 컴포넌트가 리렌더링 할지 말지를 결정(boolean 반환)하는 메서드
   - **componentDidUpdate**
     - 컴포넌트가 업데이트 되고 난 후 발생
3. **제거(unmount)**
   - **componentWillUnmount**
     - 컴포넌트가 화면에서 사라지기 직전에 호출
     - 주로 DOM에 직접 등록했었던 이벤트를 제거
     - 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose기능이 있다면 여기서 호출

## 함수 컴포넌트 생명 주기(Function Component Life Cycle)

### Hook

- 함수형 컴포넌트에서 React state와 생명주기 기능을 연동 할 수 있게 해주는 함수
- Hook은 class 안에서 동작하지 않고, class 없이 React를 사용할 수 있게 함
- 장점
  - 기존의 라이프사이클 메서드 기반이 아닌 로직 기반으로 나눌 수 있어서 컴포넌트를 함수 단위로 잘게 쪼갤 수 있음
- 규칙
  - 최상위에서만 Hook을 호출해야 한다
  - 함수 컴포넌트에서만 Hook을 호출해야 한다

### Hook의 종류

- **useState**
  - state를 관리
    ```jsx
    const [state, setState] = useState(initialState);
    ```
- **useEffect**

  - 화면에 렌더링이 완료된 후에 수행되며`componentDidMount`와 `componentDidUpdate`, `componentWillUnmount`가 합쳐진 것

    ```jsx
    // 렌더링 결과가 실제 돔에 반영된 후마다 호출
    useEffect(() => {});

    // 컴포넌트가 처음 나타날때 한 번 호출
    useEffect(() => {}, []);

    // 조건부 effect 발생, 의존성 중 하나가 변경된다면 effect는 항상 재생성됩니다.
    useEffect(() => {}, [의존성1, 의존성2, ..]);
    ```

- **useLayoutEffect**
  - 만약 화면을 다 그리기 이전에 동기화 되어야 하는 경우 사용
  - 컴포넌트 렌더링 → `useLayoutEffect` 실행 → 화면 업데이트 순으로 effect를 실행
- **useContext**
  - Context API를 통해 만들어진 Context에서 제공하는 Value를 가져올 수 있음
    ```jsx
    const value = useContext(MyContext);
    ```
  - 컴포넌트에서 가장 가까운 `<MyContext.Provider>`가 갱신되면 이 Hook은 그 MyContext provider에게 전달된 가장 최신의 context value를 사용하여 렌더러를 트리거 함
- **useReducer**
  - 컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있음 (useState의 대체 함수)
    ```jsx
    const [state, dispatch] = useReducer(reducer, initialArg, init);
    ```
  - 컴포넌트 바깥에 로직을 작성할 수 있고, 다른 파일에 작성한 후 불러와서 사용할 수도 있음
  - reducer
    - 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
- **useRef**
  - 특정 DOM을 선택할 때 사용
    ```jsx
    const refContainer = useRef(null);
    ```
  - `.current`프로퍼티로 전달된 인자로 초기화된 변경 가능한 ref 객체를 반환. 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지
- **useMemo**
  - 이미 연산된 값을 리렌더링 시 다시 계산하지 않도록 메모이제이션된 값을 반환
    ```jsx
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    ```
  - 의존성이 변경되었을 때만 메모이제이션된 값만 다시 계산
- **useCallback**
  - 메모이제이션된 콜백을 반환 (useMemo와 유사)
    ```jsx
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

# React Router

## React Router 설치

```powershell
npm install --save react-router
```

## React Router

### Router Component

- 화면 render에 메인으로 Router 컴포넌트를 반환
- 컴포넌트 내부에 Route를 포함하여 라우팅을 구현
- **borwserHistory**
  - 일반 웹을 사용하는 것처럼 주소를 바꾸고, 뒤로 가기와 앞으로 가기를 할 수 있게 해줌
  - `<Router history={browserHistory}></Router>`

### Route

- **IndexRoute**
  - **`/`**에 해당하는 path에 기본으로 보여지는 컴포넌트를 설정하는 곳
  - `<IndexRoute component={Index} />`
- **Route**
  - **`/name`**에 해당하는 path에 이동시 보여지는 컴포넌트를 설정
  - `<Route path="name" component={ComponetName}/>`
  - 하위 모든 경로, 즉 `/*`에 해당하게 할 때에는 \*를 활용
  - `<Route path="*" component={ComponetName}/>`

## React Router 사용 예시

- 전체 폴더 구조
  ```jsx
  components 폴더
  --App.js
  --About.js
  --Index.js
  --NoMatch.js
  render.js
  react.html
  main.js
  ```
- components/App.js  - 레이아웃

  ```jsx
  import React, { Component } from 'react';
  import PropTypes from 'prop-types';

  class App extends Component {
    render() {
      return (
        <header>테스트 페이지</header>
        <div className="detail">
          {this.props.children}
        </div>
        <footer>Copyright Yechan. All right reserved.</footer>
        <script src="./main.js" />
      );
    }
  }

  App.propTypes = {
    children: PropTypes.element.isRequired,
  };

  export default App;
  ```

- components/Index.js - 메인페이지

  ```jsx
  import React, { Component } from "react";

  export default class extends Component {
    render() {
      return (
        <div>
          <h1>메인 페이지</h1>
          <p>이 페이지는 메인 페이지 입니다!!</p>
        </div>
      );
    }
  }
  ```

- components/About.js - 안내페이지

  ```jsx
  import React, { Component } from "react";

  export default class extends Component {
    render() {
      return (
        <div>
          <p>이 페이지는 안내 페이지 입니다!!</p>
        </div>
      );
    }
  }
  ```

- components/NoMatch.js - 없는 경로 접근시 나오는 화면

  ```jsx
  import React from "react";

  export default () => (
    <div className="not-found">
      <h1>404 NOT FOUND!</h1>
      <p>찾으시는 페이지가 없습니다! 주소가 맞나 다시 한 번 확인해주세요!</p>
    </div>
  );
  ```

- render.js

  ```jsx
  import React from "react";
  import { render } from "react-dom";
  import { Router, Route, IndexRoute, Link, browserHistory } from "react-router";
  import App from "./components/App.js";
  import Index from "./components/Index.js";
  import About from "./components/About.js";
  import NoMatch from "./components/NoMatch.js";

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="about" component={About} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>,
    document.getElementById("root")
  );
  ```

# React 폴더 구조

## CRA의 초기 폴더구조

```
my-app
├── node_modules
├── public
├── src
├── .gitignore
├── package.json
└── README.md
```

- **node_modules**
  - 현재 프로젝트에 포함된 라이브러리들이 설치되어 있는 폴더로 보통 깃과 같은 저장소에 올릴 때는 이 폴더를 함께 올리지 않음
- **public**
  - index.html과 같은 정적 파일이 포함되는 곳으로 컴파일이 필요 없는 파일들이 위치하는 폴더
- **src**
  - 리액트 내부에서 작성하는 거의 모든 파일들이 이 폴더 내부에서 작성되며 이 폴더에 있는 파일들은 명령어에 따라 JS로 컴파일이 진행

## src 내부 폴더구조

```
└─ src
 ├─ components
 ├─ assets
 ├─ hooks (= hoc)
 ├─ pages
 ├─ constants
 ├─ config
 ├─ styles
 ├─ services (= api)
 ├─ utils
 ├─ contexts
 ├─ App.js
 └─ index.js
```

- **components**
  - 재사용 가능한 컴포넌트들이 위치하는 폴더
  - 컴포넌트는 매우 많아질 수 있기 때문에 이 폴더 내부에서 하위폴더로 추가로 분류하는 경우가 많음
- **assets**
  - 이미지 혹은 폰트와 같은 파일들이 저장되는 폴더
  - 파일들을 public에 직접 넣는 경우도 있는데 **컴파일시에 필요한지 여부**에 따라 분류
  - index.html내부에서 직접 사용하여 컴파일 단계에서 필요하지 않은 파일들은 public 폴더
  - 컴포넌트 내부에서 사용하는 이미지 파일인 경우 assets 폴더에 위치
- **hooks (= hoc)**
  - 커스텀 훅이 위치하는 폴더
- **pages**
  - React Router 등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 위치
- **constants**
  - 공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더
- **config**
  - config 파일이 많지 않은 경우 보통 최상위에 위치시켜놓지만 여러개의 config 파일이 있을 경우 폴더로 분리하기도 함
- **styles**
  - css 파일들이 포함되는 폴더
- **services (= api)**
  - 보통 API 관련 로직의 모듈 파일이 위치
  - auth와 같이 인증과 관련된 파일이 포함되기도 함
- **utils**
  - 정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더
- **contexts**
  - contextAPI를 사용할 때 관련 파일들이 위치하는 곳
  - 상태관리를 위해 contextAPI 대신 redux를 사용 할 경우 폴더 이름을 `store`로 사용

# 참고 자료

[ZeroCho Blog](https://www.zerocho.com/)

[[리액트 무료 강좌 1-1]리뉴얼 - 리액트를 왜 쓰는가?](https://www.youtube.com/watch?v=aYwSrzeyUOk&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)

[[React.js] 리액트 라이프사이클(life cycle) 순서, 역할, Hook](https://velog.io/@minbr0ther/React.js-리액트-라이프사이클life-cycle-순서-역할)

[[React] 리액트의 폴더 구조](https://velog.io/@sisofiy626/React-리액트의-폴더-구조)
